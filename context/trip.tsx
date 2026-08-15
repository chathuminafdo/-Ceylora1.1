import { createContext, ReactNode, useContext, useState } from "react";

type TripContextValue = {
  tripIds: string[];
  addToTrip: (id: string) => void;
  removeFromTrip: (id: string) => void;
  isInTrip: (id: string) => boolean;
};

const TripContext = createContext<TripContextValue | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripIds, setTripIds] = useState<string[]>([]);

  const addToTrip = (id: string) => {
    setTripIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromTrip = (id: string) => {
    setTripIds((prev) => prev.filter((tripId) => tripId !== id));
  };

  const isInTrip = (id: string) => tripIds.includes(id);

  return (
    <TripContext.Provider value={{ tripIds, addToTrip, removeFromTrip, isInTrip }}>
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
