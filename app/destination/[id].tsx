import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { categoryMeta, destinations, stayMeta } from "@/data/destinations";
import { radius, spacing, useAppTheme } from "@/context/theme";
import { useTrip } from "@/context/trip";
import { DestinationHero } from "@/components/destination-hero";
import { Button } from "@/components/ui/button";

export default function DestinationDetailScreen() {
  const { colors } = useAppTheme();
  const { isInTrip, addToTrip, removeFromTrip } = useTrip();
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = destinations.find((item) => item.id === id);

  if (!place) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subtext }]}>
          Destination not found
        </Text>
      </View>
    );
  }

  const bookmarked = isInTrip(place.id);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen options={{ title: place.name }} />

      <DestinationHero
        category={place.categories[0]}
        height={200}
        iconSize={54}
        style={styles.hero}
      />

      <Text style={[styles.name, { color: colors.text }]}>{place.name}</Text>
      <Text style={[styles.district, { color: colors.subtext }]}>
        {place.district}, {place.province} Province
      </Text>

      <View style={styles.pillRow}>
        {place.categories.map((category) => (
          <View
            key={category}
            style={[styles.pill, { backgroundColor: colors.accentSoft }]}
          >
            <Text style={[styles.pillText, { color: colors.accent }]}>
              {categoryMeta[category].label}
            </Text>
          </View>
        ))}
      </View>

      {place.bestFor && (
        <View style={[styles.bestForBanner, { backgroundColor: colors.sand }]}>
          <Text style={styles.bestForText}>Best for: {place.bestFor}</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.description, { color: colors.text }]}>
          {place.description}
        </Text>
      </View>

      {place.stayOptions.length > 0 && (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.stayTitle, { color: colors.text }]}>
            Where to stay nearby
          </Text>
          <View style={styles.pillRow}>
            {place.stayOptions.map((stay) => (
              <View
                key={stay}
                style={[
                  styles.pill,
                  { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 },
                ]}
              >
                <Text style={[styles.pillText, { color: colors.text }]}>
                  {stayMeta[stay].label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <Button
        label="Open in Maps"
        variant="secondary"
        onPress={() => Linking.openURL(mapsUrl)}
        style={styles.actionSpacing}
      />

      <Button
        label={bookmarked ? "Remove from Trip" : "Add to Trip"}
        variant="primary"
        onPress={() =>
          bookmarked ? removeFromTrip(place.id) : addToTrip(place.id)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingTop: 20,
  },

  hero: {
    marginBottom: spacing.lg,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
  },

  district: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: spacing.md,
  },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },

  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },

  bestForBanner: {
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },

  bestForText: {
    color: "#2E2412",
    fontSize: 13,
    fontWeight: "700",
  },

  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
  },

  stayTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },

  actionSpacing: {
    marginBottom: spacing.sm,
  },

  emptyText: {
    marginTop: 60,
    fontSize: 16,
    textAlign: "center",
  },
});
