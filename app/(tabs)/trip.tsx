import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Destination, destinations } from "@/data/destinations";
import { radius, spacing, useAppTheme } from "@/context/theme";
import { useTrip } from "@/context/trip";
import { COLOMBO, distanceKm, optimizeRoute } from "@/lib/route";
import { Button } from "@/components/ui/button";
import { TripMap } from "@/components/trip-map";

export default function TripScreen() {
  const { colors } = useAppTheme();
  const {
    tripItems,
    loading,
    error,
    refresh,
    removeFromTrip,
    updateNote,
    moveTripItem,
  } = useTrip();
  const [optimized, setOptimized] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");

  const notesByDestination = useMemo(() => {
    const map = new Map<string, string>();
    tripItems.forEach((item) => map.set(item.destinationId, item.notes));
    return map;
  }, [tripItems]);

  const tripStops = useMemo(
    () =>
      tripItems
        .map((tripItem) =>
          destinations.find((place) => place.id === tripItem.destinationId)
        )
        .filter((place): place is Destination => place !== undefined),
    [tripItems]
  );

  const optimizedStops = useMemo(() => optimizeRoute(tripStops), [tripStops]);

  const alreadyOptimal = useMemo(
    () =>
      tripStops.length > 1 &&
      tripStops.every((stop, index) => stop.id === optimizedStops[index]?.id),
    [tripStops, optimizedStops]
  );

  const orderedStops = optimized ? optimizedStops : tripStops;

  const legs = useMemo(() => {
    let previous = COLOMBO;
    return orderedStops.map((stop) => {
      const distance = distanceKm(previous, stop);
      previous = stop;
      return distance;
    });
  }, [orderedStops]);

  const totalDistance = legs.reduce((sum, leg) => sum + leg, 0);

  const startEditingNote = (destinationId: string) => {
    setEditingId(destinationId);
    setDraftNote(notesByDestination.get(destinationId) ?? "");
  };

  const saveNote = (destinationId: string) => {
    updateNote(destinationId, draftNote.trim());
    setEditingId(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Trip Planner</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>
        Your Sri Lanka bucket list
      </Text>

      {error && (
        <View style={[styles.errorBanner, { backgroundColor: colors.dangerSoft }]}>
          <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
          <Pressable onPress={refresh} hitSlop={8}>
            <Text style={[styles.retryText, { color: colors.danger }]}>Retry</Text>
          </Pressable>
        </View>
      )}

      {loading && tripItems.length === 0 ? (
        <View style={styles.loadingState}>
          <ActivityIndicator color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.subtext }]}>
            Loading your trip…
          </Text>
        </View>
      ) : orderedStops.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.subtext }]}>
          Your trip is empty. Add destinations from Home by tapping the ☆
          star on any card.
        </Text>
      ) : (
        <>
          {loading && (
            <Text style={[styles.syncingText, { color: colors.subtext }]}>
              Syncing…
            </Text>
          )}

          <Button
            label={optimized ? "Showing Optimized Route" : "Optimize Route"}
            variant={optimized ? "primary" : "secondary"}
            onPress={() => setOptimized((prev) => !prev)}
            style={styles.optimizeButton}
          />

          <Text style={[styles.totalDistance, { color: colors.subtext }]}>
            Starting from Colombo · {totalDistance.toFixed(0)} km total
          </Text>

          {optimized && alreadyOptimal && (
            <Text style={[styles.optimalHint, { color: colors.success }]}>
              ✓ This was already the shortest order for these stops
            </Text>
          )}

          {optimized && orderedStops.length > 1 && (
            <Text style={[styles.reorderHint, { color: colors.subtext }]}>
              Turn off Optimize Route to reorder stops with the ▲▼ buttons
            </Text>
          )}

          <View style={styles.mapWrapper}>
            <TripMap stops={orderedStops} height={200} />
          </View>

          <FlatList
            key={optimized ? "optimized" : "added"}
            data={orderedStops}
            extraData={{ orderedStops, editingId, draftNote, notesByDestination, optimized }}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const note = notesByDestination.get(item.id) ?? "";
              const isEditing = editingId === item.id;

              return (
                <View style={[styles.stopCard, { backgroundColor: colors.card }]}>
                  <View style={styles.stopRow}>
                    <View style={[styles.orderBadge, { backgroundColor: colors.accent }]}>
                      <Text style={styles.orderBadgeText}>{index + 1}</Text>
                    </View>

                    <View style={styles.stopInfo}>
                      <Text style={[styles.stopName, { color: colors.text }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.stopMeta, { color: colors.subtext }]}>
                        {item.district} · {legs[index].toFixed(0)} km from
                        previous stop
                      </Text>
                    </View>

                    {!optimized && (
                      <View style={styles.reorderButtons}>
                        <Pressable
                          hitSlop={8}
                          disabled={index === 0}
                          onPress={() => moveTripItem(item.id, "up")}
                        >
                          <Text
                            style={[
                              styles.reorderArrow,
                              { color: index === 0 ? colors.border : colors.accent },
                            ]}
                          >
                            ▲
                          </Text>
                        </Pressable>
                        <Pressable
                          hitSlop={8}
                          disabled={index === orderedStops.length - 1}
                          onPress={() => moveTripItem(item.id, "down")}
                        >
                          <Text
                            style={[
                              styles.reorderArrow,
                              {
                                color:
                                  index === orderedStops.length - 1
                                    ? colors.border
                                    : colors.accent,
                              },
                            ]}
                          >
                            ▼
                          </Text>
                        </Pressable>
                      </View>
                    )}

                    <Pressable hitSlop={10} onPress={() => removeFromTrip(item.id)}>
                      <Text style={[styles.remove, { color: colors.muted }]}>✕</Text>
                    </Pressable>
                  </View>

                  {isEditing ? (
                    <View style={styles.noteEditRow}>
                      <TextInput
                        style={[
                          styles.noteInput,
                          {
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                            color: colors.text,
                          },
                        ]}
                        placeholder="Add a note for this stop…"
                        placeholderTextColor={colors.subtext}
                        value={draftNote}
                        onChangeText={setDraftNote}
                        autoFocus
                        multiline
                      />
                      <Pressable onPress={() => saveNote(item.id)} hitSlop={8}>
                        <Text style={[styles.saveNote, { color: colors.accent }]}>
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => startEditingNote(item.id)}>
                      <Text
                        style={[
                          styles.noteText,
                          { color: note ? colors.text : colors.subtext },
                        ]}
                      >
                        {note || "+ Add a note"}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
    marginBottom: spacing.xl,
  },

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  errorText: {
    fontSize: 13,
    flex: 1,
    marginRight: spacing.sm,
  },

  retryText: {
    fontSize: 13,
    fontWeight: "700",
  },

  loadingState: {
    marginTop: 60,
    alignItems: "center",
  },

  loadingText: {
    marginTop: spacing.sm,
    fontSize: 14,
  },

  syncingText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  emptyText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 40,
    lineHeight: 22,
    paddingHorizontal: spacing.sm,
  },

  optimizeButton: {
    marginBottom: spacing.md,
  },

  mapWrapper: {
    marginBottom: spacing.lg,
  },

  totalDistance: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: spacing.lg,
  },

  optimalHint: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: spacing.lg,
    marginTop: -8,
  },

  reorderHint: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: spacing.lg,
    marginTop: -8,
  },

  stopCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  stopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },

  orderBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  stopInfo: {
    flex: 1,
  },

  stopName: {
    fontSize: 16,
    fontWeight: "700",
  },

  stopMeta: {
    fontSize: 12,
    marginTop: 3,
  },

  remove: {
    fontSize: 18,
    marginLeft: spacing.sm,
  },

  reorderButtons: {
    alignItems: "center",
    marginLeft: spacing.sm,
  },

  reorderArrow: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },

  noteText: {
    fontSize: 13,
    marginTop: spacing.sm,
    marginLeft: 44,
  },

  noteEditRow: {
    marginTop: spacing.sm,
    marginLeft: 44,
  },

  noteInput: {
    borderWidth: 1,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 13,
    minHeight: 44,
  },

  saveNote: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: spacing.xs,
    alignSelf: "flex-end",
  },
});
