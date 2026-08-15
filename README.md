# Ceylora — Sri Lanka Travel Planner

## Target Domain
Travel & Tourism — specifically domestic and inbound travel within Sri Lanka.

## Problem Statement
Travellers exploring Sri Lanka face a scattered set of resources — blogs, generic
map apps, and word of mouth — to figure out what's actually worth visiting in a
given district, whether it matches what they're after (sightseeing, religious
sites, or a place to stay), and in what order to visit everything on their list
without doubling back across the country.

Ceylora gives travellers a single, curated directory of Sri Lankan destinations
that can be searched by district, filtered by interest, and assembled into a
day-by-day trip with a one-tap route optimizer.

## How the App Solves It
- **Home screen** — a `FlatList` of destinations with a search bar (by district
  or destination name) and Fun / Faith / Stay filter chips, so a traveller can
  narrow the country down to "temples near Kandy" or "beaches in Matara" in
  seconds.
- **Destination Detail screen** — tap any destination to see a full description,
  an "Open in Maps" link to its coordinates, and a one-tap "Add to Trip" button.
- **Trip Planner screen** — the traveller's bucket list of saved destinations,
  with an **Optimize Route** button that reorders the stops using a
  nearest-neighbour algorithm (Haversine great-circle distance) starting from
  Colombo — a simple, explainable approximation of the travelling-salesman
  problem that avoids doubling back across the island.
- **Settings screen** — dark/light mode toggle and an About card.

## Screens
1. **Home** (`app/(tabs)/index.tsx`) — destination list, search, category filter.
2. **Destination Detail** (`app/destination/[id].tsx`) — full details, map link,
   add/remove trip.
3. **Trip Planner** (`app/(tabs)/trip.tsx`) — bucket list + route optimizer.
4. **Settings** (`app/(tabs)/settings.tsx`) — dark mode, about.

## State & Architecture
- `useState` for search text and selected category (Home), and the
  optimize/added-order toggle (Trip).
- **React Context** (`context/trip.tsx`) shares the trip bucket list across
  Home, Detail, and Trip screens without prop drilling.
- **React Context** (`context/theme.tsx`) shares the light/dark theme the same
  way, driven by a toggle in Settings.
- `lib/route.ts` holds the pure route-optimization logic (Haversine distance +
  greedy nearest-neighbour ordering) — no external API required.

## Design Note
Destination coordinates power an "Open in Maps" deep link rather than an
embedded interactive map, to avoid requiring a Google Maps API key / native map
config for a Sprint 1 prototype. The link opens the location directly in the
device's Maps app.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. Scan the QR code with Expo Go on Android, or press `a` to launch an Android emulator.

## Screenshots
_Add screenshots of the Home, Destination Detail, Trip Planner, and Settings
screens here before submission._
