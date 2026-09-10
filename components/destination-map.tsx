import { Linking, Pressable, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { radius } from "@/context/theme";

type DestinationMapProps = {
  latitude: number;
  longitude: number;
  name: string;
  height?: number;
};

// A small, non-interactive map preview (pan/zoom disabled so it doesn't
// fight a parent ScrollView's gestures) — tapping it opens full turn-by-turn
// directions in the device's Maps app.
export function DestinationMap({
  latitude,
  longitude,
  name,
  height = 180,
}: DestinationMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <Pressable
      style={[styles.container, { height }]}
      onPress={() => Linking.openURL(mapsUrl)}
    >
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        pointerEvents="none"
      >
        <Marker coordinate={{ latitude, longitude }} title={name} />
      </MapView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: "hidden",
  },
});
