import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Category,
  categoryMeta,
  destinations,
  Destination,
} from "@/data/destinations";
import { radius, spacing, useAppTheme } from "@/context/theme";
import { useTrip } from "@/context/trip";
import { DestinationCard } from "@/components/destination-card";

const ALL_CATEGORIES = Object.keys(categoryMeta) as Category[];

const CHIP_LABEL: Record<Category, string> = {
  faith: "Faith",
  fun: "Fun",
  nature: "Nature",
  beach: "Beach",
  hillcountry: "Hills",
  culture: "Culture",
  wellness: "Wellness",
  food: "Food",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const FEATURED = destinations.filter((place) => place.bestFor).slice(0, 8);

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { isInTrip, addToTrip, removeFromTrip } = useTrip();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const greeting = useMemo(getGreeting, []);

  const isBrowsing = search.length === 0 && selectedCategory === null;

  const filteredDestinations = destinations.filter((place) => {
    const query = search.toLowerCase();
    const matchesSearch =
      place.name.toLowerCase().includes(query) ||
      place.district.toLowerCase().includes(query) ||
      place.province.toLowerCase().includes(query);
    const matchesCategory = selectedCategory
      ? place.categories.includes(selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (place: Destination) => {
    if (isInTrip(place.id)) {
      removeFromTrip(place.id);
    } else {
      addToTrip(place);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={[styles.greeting, { color: colors.subtext }]}>
              {greeting} 👋
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Discover Sri Lanka
            </Text>

            <TextInput
              style={[
                styles.searchInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Search district, province, or place"
              placeholderTextColor={colors.subtext}
              value={search}
              onChangeText={setSearch}
            />

            <View style={styles.chipGrid}>
              <Pressable
                style={[
                  styles.chip,
                  { backgroundColor: colors.accentSoft },
                  selectedCategory === null && { backgroundColor: colors.accent },
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.accent },
                    selectedCategory === null && { color: colors.accentText },
                  ]}
                >
                  All
                </Text>
              </Pressable>

              {ALL_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <Pressable
                    key={category}
                    style={[
                      styles.chip,
                      { backgroundColor: colors.accentSoft },
                      isSelected && { backgroundColor: colors.accent },
                    ]}
                    onPress={() =>
                      setSelectedCategory(isSelected ? null : category)
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: colors.accent },
                        isSelected && { color: colors.accentText },
                      ]}
                    >
                      {CHIP_LABEL[category]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {isBrowsing && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Featured Experiences
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={FEATURED}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.featuredList}
                  renderItem={({ item }) => (
                    <DestinationCard
                      destination={item}
                      variant="featured"
                      bookmarked={isInTrip(item.id)}
                      onToggleBookmark={() => toggleBookmark(item)}
                    />
                  )}
                />
              </View>
            )}

            <Text
              style={[styles.sectionTitle, styles.section, { color: colors.text }]}
            >
              Explore Sri Lanka
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            bookmarked={isInTrip(item.id)}
            onToggleBookmark={() => toggleBookmark(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.subtext }]}>
            No destinations found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },

  greeting: {
    fontSize: 14,
    fontWeight: "600",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 2,
    marginBottom: spacing.lg,
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: spacing.md,
  },

  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },

  section: {
    marginTop: spacing.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.md,
  },

  featuredList: {
    paddingRight: spacing.md,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
});
