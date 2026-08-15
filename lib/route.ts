import { Destination } from "@/data/destinations";

type GeoPoint = { latitude: number; longitude: number };

export const COLOMBO: GeoPoint = { latitude: 6.9271, longitude: 79.8612 };

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function distanceKm(a: GeoPoint, b: GeoPoint) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
}

/**
 * Greedy nearest-neighbour heuristic starting from Colombo.
 * Not a true optimal TSP solve, but a simple, explainable approximation
 * that works well for a small day-trip bucket list.
 */
export function optimizeRoute(stops: Destination[]): Destination[] {
  const remaining = [...stops];
  const ordered: Destination[] = [];
  let current: GeoPoint = COLOMBO;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    remaining.forEach((stop, index) => {
      const distance = distanceKm(current, {
        latitude: stop.latitude,
        longitude: stop.longitude,
      });
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const [next] = remaining.splice(nearestIndex, 1);
    ordered.push(next);
    current = { latitude: next.latitude, longitude: next.longitude };
  }

  return ordered;
}
