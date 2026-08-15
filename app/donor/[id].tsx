import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { donors } from "@/data/donors";

export default function DonorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const donor = donors.find((item) => item.id === id);

  const [available, setAvailable] = useState(donor?.available ?? false);

  if (!donor) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Donor not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: donor.name }} />

      <View style={styles.bloodBadge}>
        <Text style={styles.bloodBadgeText}>{donor.bloodType}</Text>
      </View>

      <Text style={styles.name}>{donor.name}</Text>
      <Text style={styles.area}>{donor.area}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone</Text>
        <Text style={styles.detailValue}>{donor.phone}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Last donation</Text>
        <Text style={styles.detailValue}>{donor.lastDonation}</Text>
      </View>

      <Pressable
        style={[styles.availabilityToggle, available && styles.availableBg]}
        onPress={() => setAvailable((prev) => !prev)}
      >
        <Text
          style={[
            styles.availabilityToggleText,
            available && styles.availableText,
          ]}
        >
          {available ? "Available to donate" : "Currently resting"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:${donor.phone}`)}
      >
        <Text style={styles.callButtonText}>Call Donor</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 24,
    alignItems: "center",
  },

  bloodBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#c0392b",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },

  bloodBadgeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },

  area: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },

  detailRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 10,
  },

  detailLabel: {
    fontSize: 15,
    color: "#777",
  },

  detailValue: {
    fontSize: 15,
    fontWeight: "600",
  },

  availabilityToggle: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#eee",
  },

  availableBg: {
    backgroundColor: "#27ae60",
  },

  availabilityToggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },

  availableText: {
    color: "white",
  },

  callButton: {
    width: "100%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#c0392b",
  },

  callButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },

  emptyText: {
    marginTop: 60,
    fontSize: 16,
    color: "#777",
  },
});
