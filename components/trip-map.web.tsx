import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Destination } from "@/data/destinations";
import { radius, spacing, useAppTheme } from "@/context/theme";
import { buildStaticMapUrl } from "@/lib/staticmap";

type TripMapProps = {
  stops: Destination[];
  height?: number;
};

// react-native-maps has no web renderer, so the web build shows a static
// preview image with a pin per stop instead — numbers/names for each stop
// still appear in the list below the map.
export function TripMap({ stops, height = 200 }: TripMapProps) {
  const { colors } = useAppTheme();
  const [failed, setFailed] = useState(false);

  if (stops.length === 0) return null;

  const staticMapUrl = buildStaticMapUrl(
    stops.map((stop) => ({ latitude: stop.latitude, longitude: stop.longitude })),
    { height: height * 2 }
  );

  return (
    <View style={[styles.container, { height, backgroundColor: colors.accentSoft }]}>
      {failed ? (
        <View style={styles.fallback}>
          <Text style={{ color: colors.subtext, fontSize: 13 }}>
            Map preview unavailable
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: staticMapUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
});
