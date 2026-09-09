// Web fallback for embedded maps — react-native-maps has no web renderer,
// so the .web.tsx map components fall back to a static preview image from
// a free, no-API-key tile service instead of an interactive MapView.
type Point = { latitude: number; longitude: number };

export function buildStaticMapUrl(
  markers: Point[],
  options?: { width?: number; height?: number }
) {
  const width = options?.width ?? 640;
  const height = options?.height ?? 320;
  const params = new URLSearchParams({ size: `${width}x${height}` });
  markers.forEach((point) => {
    params.append("markers", `${point.latitude},${point.longitude},red-pushpin`);
  });
  return `https://staticmap.openstreetmap.de/staticmap.php?${params.toString()}`;
}
