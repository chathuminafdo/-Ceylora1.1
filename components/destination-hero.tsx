import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { Category, categoryMeta } from "@/data/destinations";
import { radius, useAppTheme } from "@/context/theme";

type Tone = "teal" | "forest" | "sand";

// Groups the 8 categories into 3 calm tonal families, built only from the
// approved palette — no photography assets exist in this project, so this
// gradient + icon treatment stands in for destination imagery.
const CATEGORY_TONE: Record<Category, Tone> = {
  faith: "sand",
  culture: "sand",
  food: "sand",
  fun: "teal",
  beach: "teal",
  nature: "forest",
  hillcountry: "forest",
  wellness: "forest",
};

const GRADIENTS: Record<"light" | "dark", Record<Tone, [string, string]>> = {
  light: {
    teal: ["#1E8079", "#12514E"],
    forest: ["#7CA189", "#3F6B5C"],
    sand: ["#DFC297", "#B98F5E"],
  },
  dark: {
    teal: ["#134E49", "#04211E"],
    forest: ["#25392F", "#101C15"],
    sand: ["#4A3B26", "#241C14"],
  },
};

export function DestinationHero({
  category,
  height = 96,
  iconSize = 28,
  showIcon = true,
  style,
  children,
}: {
  category: Category;
  height?: number;
  iconSize?: number;
  showIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const { mode } = useAppTheme();
  const [start, end] = GRADIENTS[mode][CATEGORY_TONE[category]];

  return (
    <LinearGradient
      colors={[start, end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ height, borderRadius: radius.lg, overflow: "hidden" }, style]}
    >
      {showIcon && (
        <View style={styles.iconWrap} pointerEvents="none">
          <Text style={{ fontSize: iconSize, opacity: 0.85 }}>
            {categoryMeta[category].icon}
          </Text>
        </View>
      )}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
