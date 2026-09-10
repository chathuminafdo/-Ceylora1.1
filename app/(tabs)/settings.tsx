import { StyleSheet, Switch, Text, View } from "react-native";

import { radius, spacing, useAppTheme } from "@/context/theme";

export default function SettingsScreen() {
  const { mode, colors, toggleTheme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.rowBetween}>
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, { color: colors.text }]}>
              Dark Mode
            </Text>
            <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>
              Switch between light and dark appearance
            </Text>
          </View>
          <Switch
            value={mode === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>
          About Ceylora
        </Text>
        <Text style={[styles.aboutText, { color: colors.subtext }]}>
          Ceylora helps travellers discover destinations across Sri Lanka by
          district or interest, and plan an optimized day-by-day trip
          itinerary.
        </Text>
        <Text style={[styles.version, { color: colors.accent }]}>
          Version 1.1
        </Text>
      </View>
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
    marginBottom: spacing.xl,
    textAlign: "center",
  },

  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowText: {
    flex: 1,
    marginRight: spacing.md,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  rowSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },

  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
  },

  version: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.md,
  },
});
