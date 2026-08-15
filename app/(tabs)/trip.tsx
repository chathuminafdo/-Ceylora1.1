import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Destination, destinations } from "@/data/destinations";
import { radius, spacing, useAppTheme } from "@/context/theme";
import { useTrip } from "@/context/trip";
import { COLOMBO, distanceKm, optimizeRoute } from "@/lib/route";
import { Button } from "@/components/ui/button";

export default function TripScreen() {
  const { colors } = useAppTheme();
  const { tripIds, removeFromTrip } = useTrip();
  const [optimized, setOptimized] = useState(false);

  const tripStops = useMemo(
    () =>
      tripIds
        .map((id) => destinations.find((place) => place.id === id))
        .filter((place): place is Destination => place !== undefined),
    [tripIds]
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Trip Planner</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>
        Your Sri Lanka bucket list
      </Text>

      {orderedStops.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.subtext }]}>
          Your trip is empty. Add destinations from Home by tapping the ☆
          star on any card.
        </Text>
      ) : (
        <>
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

          <FlatList
            key={optimized ? "optimized" : "added"}
            data={orderedStops}
            extraData={orderedStops}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={[styles.stopCard, { backgroundColor: colors.card }]}>
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

                <Pressable hitSlop={10} onPress={() => removeFromTrip(item.id)}>
                  <Text style={[styles.remove, { color: colors.muted }]}>✕</Text>
                </Pressable>
              </View>
            )}
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

  stopCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
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
});
