import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import { Destination } from "@/data/destinations";
import { fetchRoadRoute } from "@/lib/directions";
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

  const straightLineCoordinates = [
    COLOMBO,
    ...stops.map((stop) => ({ latitude: stop.latitude, longitude: stop.longitude })),
  ];
  const stopSignature = stops.map((stop) => stop.id).join(",");

  const [roadRoute, setRoadRoute] = useState<{ latitude: number; longitude: number }[] | null>(
    null
  );

  useEffect(() => {
    if (stops.length === 0) return;

    let cancelled = false;
    setRoadRoute(null);
    fetchRoadRoute(straightLineCoordinates).then((route) => {
      if (!cancelled) setRoadRoute(route);
    });

    mapRef.current?.fitToCoordinates(straightLineCoordinates, {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: true,
    });

    return () => {
      cancelled = true;
    };
    // straightLineCoordinates is derived fresh from stops every render —
    // stopSignature is the stable value that should actually retrigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopSignature]);

  if (stops.length === 0) return null;

  const routeCoordinates = roadRoute ?? straightLineCoordinates;

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
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
