import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Destination } from "@/data/destinations";
import {
  ApiTripItem,
  createTripItem,
  deleteTripItem,
  fetchTripItems,
  isValidTripItem,
  updateTripItem,
} from "@/lib/api";
import {
  loadCachedTripItems,
  loadPendingDeleteIds,
  saveCachedTripItems,
  savePendingDeleteIds,
} from "@/lib/storage";

type TripContextValue = {
  tripItems: ApiTripItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addToTrip: (destination: Destination) => void;
  removeFromTrip: (destinationId: string) => void;
  updateNote: (destinationId: string, notes: string) => void;
  reorderTrip: (orderedDestinationIds: string[]) => void;
  isInTrip: (destinationId: string) => boolean;
};

const TripContext = createContext<TripContextValue | undefined>(undefined);

// Local storage is the source of truth for the trip list — every mutation
// below applies to it immediately and stays applied even if the matching
// MockAPI request fails, so a flaky connection can never lose a stop the
// user added, removed, reordered, or annotated. `refresh()` (a background
// GET) only ever reconciles on top of that local state; it never discards
// changes that haven't made it to the server yet.
export function TripProvider({ children }: { children: ReactNode }) {
  const [tripItems, setTripItems] = useState<ApiTripItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pendingDeleteIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Cache load must finish before the first refresh() runs — otherwise
    // a fast network response and a slow AsyncStorage read can arrive in
    // either order, and the stale cache can overwrite freshly-synced data.
    (async () => {
      const [rawCached, pendingDeleteIds] = await Promise.all([
        loadCachedTripItems(),
        loadPendingDeleteIds(),
      ]);
      pendingDeleteIdsRef.current = new Set(pendingDeleteIds);

      const cached = rawCached.filter(isValidTripItem);
      if (cached.length > 0) setTripItems(cached);
      if (cached.length !== rawCached.length) saveCachedTripItems(cached);

      refresh();
    })();
  }, []);

  const refresh = () => {
    setLoading(true);
    setError(null);
    fetchTripItems()
      .then((rawServerItems) => {
        setTripItems((prev) => {
          // Re-validate prev too — belt-and-suspenders in case any bad
          // record ever slips into state through a path that doesn't
          // already guard against it, so this can't crash the merge below.
          const validPrev = prev.filter(isValidTripItem);
          // Keep any local stop the server doesn't know about yet (still
          // mid-sync), and drop any the server returned that we've since
          // deleted locally but hasn't confirmed.
          const unsynced = validPrev.filter((item) => item.id.startsWith("temp-"));
          const visibleServerItems = rawServerItems.filter(isValidTripItem).filter(
            (item) => !pendingDeleteIdsRef.current.has(item.destinationId)
          );
          const dedupedUnsynced = unsynced.filter(
            (item) => !visibleServerItems.some((s) => s.destinationId === item.destinationId)
          );
          const merged = [...visibleServerItems, ...dedupedUnsynced].sort(
            (a, b) => a.order - b.order
          );
          saveCachedTripItems(merged);
          return merged;
        });
      })
      .catch(() => {
        setError("Couldn't reach the server — showing your locally saved trip.");
      })
      .finally(() => setLoading(false));
  };

  const isInTrip = (destinationId: string) =>
    tripItems.some((item) => item.destinationId === destinationId);

  const addToTrip = (destination: Destination) => {
    if (isInTrip(destination.id)) return;

    const tempItem: ApiTripItem = {
      id: `temp-${Date.now()}`,
      destinationId: destination.id,
      name: destination.name,
      district: destination.district,
      notes: "",
      order: tripItems.length,
      addedAt: new Date().toISOString(),
    };

    setTripItems((prev) => {
      const next = [...prev, tempItem];
      saveCachedTripItems(next);
      return next;
    });

    createTripItem({
      destinationId: tempItem.destinationId,
      name: tempItem.name,
      district: tempItem.district,
      notes: tempItem.notes,
      order: tempItem.order,
      addedAt: tempItem.addedAt,
    })
      .then((saved) => {
        if (!isValidTripItem(saved)) {
          // A misconfigured API resource (e.g. a schema field shadowing the
          // real "id") can return a malformed record on success. Leave the
          // temp item in place rather than merging in something that would
          // corrupt state and crash on the next update.
          setError("The server's response looked malformed — this stop is saved on your device and will retry on next refresh.");
          return;
        }
        setTripItems((prev) => {
          const next = prev.map((item) => (item.id === tempItem.id ? saved : item));
          saveCachedTripItems(next);
          return next;
        });
      })
      .catch(() => {
        setError("Couldn't sync with the server — this stop is saved on your device and will retry on next refresh.");
      });
  };

  const removeFromTrip = (destinationId: string) => {
    const target = tripItems.find((item) => item.destinationId === destinationId);
    if (!target) return;

    setTripItems((prev) => {
      const next = prev.filter((item) => item.destinationId !== destinationId);
      saveCachedTripItems(next);
      return next;
    });

    if (target.id.startsWith("temp-")) return;

    pendingDeleteIdsRef.current.add(destinationId);
    savePendingDeleteIds([...pendingDeleteIdsRef.current]);

    deleteTripItem(target.id)
      .then(() => {
        pendingDeleteIdsRef.current.delete(destinationId);
        savePendingDeleteIds([...pendingDeleteIdsRef.current]);
      })
      .catch(() => {
        setError("Couldn't sync the removal with the server — it'll retry on next refresh.");
      });
  };

  const updateNote = (destinationId: string, notes: string) => {
    const target = tripItems.find((item) => item.destinationId === destinationId);
    if (!target) return;

    setTripItems((prev) => {
      const next = prev.map((item) =>
        item.destinationId === destinationId ? { ...item, notes } : item
      );
      saveCachedTripItems(next);
      return next;
    });

    if (target.id.startsWith("temp-")) return;

    updateTripItem(target.id, { notes }).catch(() => {
      setError("Couldn't sync that note with the server — it's saved on your device and will retry on next refresh.");
    });
  };

  const reorderTrip = (orderedDestinationIds: string[]) => {
    setTripItems((prev) => {
      const byDestinationId = new Map(prev.map((item) => [item.destinationId, item]));
      const reordered = orderedDestinationIds
        .map((destinationId, index) => {
          const item = byDestinationId.get(destinationId);
          return item ? { ...item, order: index } : null;
        })
        .filter((item): item is ApiTripItem => item !== null);

      if (reordered.length !== prev.length) return prev;

      saveCachedTripItems(reordered);
      reordered.forEach((item) => {
        if (!item.id.startsWith("temp-")) {
          updateTripItem(item.id, { order: item.order }).catch(() => {});
        }
      });

      return reordered;
    });
  };

  return (
    <TripContext.Provider
      value={{
        tripItems,
        loading,
        error,
        refresh,
        addToTrip,
        removeFromTrip,
        updateNote,
        reorderTrip,
        isInTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within TripProvider");
  }
  return context;
}
