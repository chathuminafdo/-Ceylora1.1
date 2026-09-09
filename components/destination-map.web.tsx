import { useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { radius, spacing, useAppTheme } from "@/context/theme";
import { buildStaticMapUrl } from "@/lib/staticmap";

type DestinationMapProps = {
  latitude: number;
  longitude: number;
  name: string;
  height?: number;
};

// react-native-maps has no web renderer, so the web build shows a static
// preview image instead of an interactive MapView — tapping it still opens
// full directions in Google Maps.
export function DestinationMap({
  latitude,
  longitude,
  height = 180,
}: DestinationMapProps) {
  const { colors } = useAppTheme();
  const [failed, setFailed] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const staticMapUrl = buildStaticMapUrl([{ latitude, longitude }], { height: height * 2 });

  return (
    <Pressable
      style={[styles.container, { height, backgroundColor: colors.accentSoft }]}
      onPress={() => Linking.openURL(mapsUrl)}
    >
      {failed ? (
        <View style={styles.fallback}>
          <Text style={{ color: colors.subtext, fontSize: 13 }}>
            Map preview unavailable — tap to open in Maps
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: "hidden",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
});
