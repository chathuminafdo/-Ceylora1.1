import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { BLOOD_TYPES, BloodType } from "@/data/donors";

export default function SettingsScreen() {
  const [defaultType, setDefaultType] = useState<BloodType | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionLabel}>Default blood type filter</Text>
      <Text style={styles.sectionHint}>
        Applied automatically when you open the Home screen.
      </Text>

      <View style={styles.chipGrid}>
        <Pressable
          style={[styles.chip, defaultType === null && styles.chipSelected]}
          onPress={() => setDefaultType(null)}
        >
          <Text
            style={[
              styles.chipText,
              defaultType === null && styles.chipTextSelected,
            ]}
          >
            All
          </Text>
        </Pressable>

        {BLOOD_TYPES.map((type) => {
          const isSelected = defaultType === type;
          return (
            <Pressable
              key={type}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => setDefaultType(type)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  sectionHint: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    marginBottom: 16,
  },

  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  chipSelected: {
    backgroundColor: "#c0392b",
    borderColor: "#c0392b",
  },

  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  chipTextSelected: {
    color: "white",
  },
});
