import AsyncStorage from "@react-native-async-storage/async-storage";

import { ApiTripItem } from "@/lib/api";

const TRIP_CACHE_KEY = "ceylora:tripItems";
const PENDING_DELETE_KEY = "ceylora:pendingDeleteIds";

// Local persistence for trip items — lets the Trip Planner render
// instantly on launch and stay usable offline, while the MockAPI
// request in the background keeps it in sync with the server. This is
// the authoritative store: mutations are kept here even when the API
// call for them fails, so the trip never silently loses a change.
export async function loadCachedTripItems(): Promise<ApiTripItem[]> {
  try {
    const raw = await AsyncStorage.getItem(TRIP_CACHE_KEY);
    return raw ? (JSON.parse(raw) as ApiTripItem[]) : [];
  } catch {
    return [];
  }
}

export async function saveCachedTripItems(items: ApiTripItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TRIP_CACHE_KEY, JSON.stringify(items));
  } catch {
    // Best-effort cache — a write failure shouldn't break the app.
  }
}

// Destination IDs removed locally whose DELETE hasn't reached the server
// yet — kept so a background refresh doesn't resurrect them from the
// server's (stale) copy of the list.
export async function loadPendingDeleteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(PENDING_DELETE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export async function savePendingDeleteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PENDING_DELETE_KEY, JSON.stringify(ids));
  } catch {
    // Best-effort cache — a write failure shouldn't break the app.
  }
}
