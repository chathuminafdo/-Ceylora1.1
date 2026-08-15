import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import { BLOOD_TYPES, BloodType, donors } from "@/data/donors";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<BloodType | null>(null);

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.area.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType ? donor.bloodType === selectedType : true;
    return matchesSearch && matchesType;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Donor Directory</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or area..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.chipGrid}>
        {BLOOD_TYPES.map((item) => {
          const isSelected = selectedType === item;
          return (
            <Pressable
              key={item}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => setSelectedType(isSelected ? null : item)}
            >
              <Text
                style={[styles.chipText, isSelected && styles.chipTextSelected]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredDonors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.donorCard}
            onPress={() => router.push(`/donor/${item.id}`)}
          >
            <View style={styles.bloodBadge}>
              <Text style={styles.bloodBadgeText}>{item.bloodType}</Text>
            </View>

            <View style={styles.donorInfo}>
              <Text style={styles.donorName}>{item.name}</Text>
              <Text style={styles.donorArea}>{item.area}</Text>
            </View>

            <Text
              style={[
                styles.availability,
                item.available ? styles.available : styles.unavailable,
              ]}
            >
              {item.available ? "Available" : "Resting"}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No donors found</Text>
        }
      />
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
    marginBottom: 16,
    textAlign: "center",
  },

  searchInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
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

  donorCard: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  bloodBadge: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#c0392b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  bloodBadgeText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },

  donorInfo: {
    flex: 1,
  },

  donorName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  donorArea: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },

  availability: {
    fontSize: 13,
    fontWeight: "600",
  },

  available: {
    color: "#27ae60",
  },

  unavailable: {
    color: "#999",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});
