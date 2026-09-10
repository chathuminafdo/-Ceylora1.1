type LatLng = { latitude: number; longitude: number };

const MAX_ROUTE_POINTS = 300;

// Thins a coordinate list down to at most `max` points (keeping the first
// and last) by sampling at a fixed stride. A defensive cap on top of
// requesting "simplified" overview, since a route through many stops can
// still add up leg by leg — a Polyline with too many points is a known
// crash/ANR risk on react-native-maps Android.
function thinRoute(points: LatLng[], max: number): LatLng[] {
  if (points.length <= max) return points;

  const stride = Math.ceil(points.length / max);
  const thinned = points.filter((_, index) => index % stride === 0);
  const last = points[points.length - 1];
  if (thinned[thinned.length - 1] !== last) thinned.push(last);
  return thinned;
}

async function requestRoute(points: LatLng[], timeoutMs: number): Promise<LatLng[] | null> {
  const coordinateList = points.map((p) => `${p.longitude},${p.latitude}`).join(";");
  // "simplified" (not "full") overview — a multi-stop road route at full
  // detail can be thousands of points per leg, which is a known crash/ANR
  // risk when handed to react-native-maps' Polyline on Android.
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinateList}?overview=simplified&geometries=geojson`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;

    const data = await response.json();
    const coordinates = data?.routes?.[0]?.geometry?.coordinates;
    if (!Array.isArray(coordinates) || coordinates.length === 0) return null;

    const route = coordinates.map(([longitude, latitude]: [number, number]) => ({
      latitude,
      longitude,
    }));
    return thinRoute(route, MAX_ROUTE_POINTS);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Snaps the given waypoints (in order) to actual roads using OSRM's free,
// no-API-key public routing server. That server is a best-effort public demo
// (no uptime/latency guarantee), so this retries once on failure before
// giving up; callers should fall back to a straight line between the points
// if this still returns null.
export async function fetchRoadRoute(points: LatLng[]): Promise<LatLng[] | null> {
  if (points.length < 2) return null;

  const first = await requestRoute(points, 12000);
  if (first) return first;

  return requestRoute(points, 12000);
}
