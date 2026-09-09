import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import { Destination } from "@/data/destinations";
import { COLOMBO } from "@/lib/route";
import { radius, useAppTheme } from "@/context/theme";

type TripMapProps = {
  stops: Destination[];
  height?: number;
};

// Overview map for the Trip Planner — numbered pins for every added
// destination (matching the list below) with a line tracing the current
// stop order, auto-framed to fit all of them.
export function TripMap({ stops, height = 200 }: TripMapProps) {
  const { colors } = useAppTheme();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (stops.length === 0) return;
    const coordinates = [
      COLOMBO,
      ...stops.map((stop) => ({ latitude: stop.latitude, longitude: stop.longitude })),
    ];
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: true,
    });
  }, [stops]);

  if (stops.length === 0) return null;

  const routeCoordinates = [
    COLOMBO,
    ...stops.map((stop) => ({ latitude: stop.latitude, longitude: stop.longitude })),
  ];

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: stops[0].latitude,
          longitude: stops[0].longitude,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
      >
        <Polyline coordinates={routeCoordinates} strokeColor={colors.accent} strokeWidth={3} />
        {stops.map((stop, index) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={`${index + 1}. ${stop.name}`}
            description={stop.district}
          >
            <View style={[styles.pin, { backgroundColor: colors.accent }]}>
              <Text style={styles.pinText}>{index + 1}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  pin: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  pinText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
});
