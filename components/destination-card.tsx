import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { Destination, categoryMeta } from "@/data/destinations";
import { destinationPhotos } from "@/data/destination-photos";
import { radius, spacing, useAppTheme } from "@/context/theme";

type DestinationCardProps = {
  destination: Destination;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  variant?: "list" | "featured";
};

export function DestinationCard({
  destination,
  bookmarked,
  onToggleBookmark,
  variant = "list",
}: DestinationCardProps) {
  const { colors } = useAppTheme();
  const isFeatured = variant === "featured";
  const primaryCategory = destination.categories[0];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, opacity: pressed ? 0.92 : 1 },
        isFeatured && styles.featuredCard,
      ]}
      onPress={() => router.push(`/destination/${destination.id}`)}
    >
      <View style={[styles.imageArea, { height: isFeatured ? 170 : 108 }]}>
        <Image
          source={destinationPhotos[destination.id]}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={150}
        />

        <Pressable
          hitSlop={10}
          onPress={onToggleBookmark}
          style={styles.bookmarkButton}
        >
          <Text
            style={[
              styles.bookmarkText,
              { color: bookmarked ? colors.accent : colors.subtext },
            ]}
          >
            {bookmarked ? "★" : "☆"}
          </Text>
        </Pressable>

        {isFeatured && (
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.scrim}
          >
            <Text style={styles.featuredName} numberOfLines={1}>
              {destination.name}
            </Text>
            <Text style={styles.featuredLocation} numberOfLines={1}>
              {destination.district}, {destination.province}
            </Text>
          </LinearGradient>
        )}
      </View>

      {!isFeatured && (
        <View style={styles.body}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {destination.name}
          </Text>
          <Text
            style={[styles.location, { color: colors.subtext }]}
            numberOfLines={1}
          >
            {destination.district}, {destination.province}
          </Text>

          <View style={styles.tagRow}>
            <View style={[styles.tag, { backgroundColor: colors.accentSoft }]}>
              <Text style={[styles.tagText, { color: colors.accent }]}>
                {categoryMeta[primaryCategory].icon}{" "}
                {categoryMeta[primaryCategory].label}
              </Text>
            </View>
            {destination.stayOptions.length > 0 && (
              <Text style={[styles.staysNote, { color: colors.subtext }]}>
                Stays nearby
              </Text>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
  },

  featuredCard: {
    width: 220,
    marginRight: spacing.md,
    marginBottom: 0,
  },

  imageArea: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },

  bookmarkButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  bookmarkText: {
    fontSize: 17,
  },

  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  featuredName: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },

  featuredLocation: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 2,
  },

  body: {
    padding: spacing.md,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  location: {
    fontSize: 13,
    marginTop: 3,
  },

  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  staysNote: {
    fontSize: 12,
  },
});
