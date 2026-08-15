import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export function AppSplash({ onFinish }: { onFinish: () => void }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start(() => onFinish());
  }, [progress, onFinish]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["10%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoEmoji}>🌴</Text>
      </View>

      <Text style={styles.appName}>Ceylora</Text>
      <Text style={styles.tagline}>Discover Sri Lanka, your way</Text>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176B6B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  logoEmoji: {
    fontSize: 44,
  },

  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },

  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
    marginBottom: 28,
  },

  progressTrack: {
    width: "70%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 2,
  },
});
