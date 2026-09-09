import { TRIP_ITEMS_ENDPOINT } from "@/lib/config";

// Shape of a trip item as stored on MockAPI.
export interface ApiTripItem {
  id: string;
  destinationId: string;
  name: string;
  district: string;
  notes: string;
  order: number;
  addedAt: string;
}

export type NewTripItem = Omit<ApiTripItem, "id">;

const REQUEST_TIMEOUT_MS = 10000;

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...options?.headers },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out — check your connection");
    }
    throw err instanceof Error ? err : new Error("Network request failed");
  } finally {
    clearTimeout(timeout);
  }
}

export function fetchTripItems(): Promise<ApiTripItem[]> {
  return request<ApiTripItem[]>(TRIP_ITEMS_ENDPOINT);
}

export function createTripItem(item: NewTripItem): Promise<ApiTripItem> {
  return request<ApiTripItem>(TRIP_ITEMS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function updateTripItem(
  id: string,
  changes: Partial<NewTripItem>
): Promise<ApiTripItem> {
  return request<ApiTripItem>(`${TRIP_ITEMS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });
}

export function deleteTripItem(id: string): Promise<ApiTripItem> {
  return request<ApiTripItem>(`${TRIP_ITEMS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}
