# Ceylora — Sri Lanka Travel Planner

## Target Domain
Travel & Tourism — specifically domestic and inbound travel within Sri Lanka.

## Problem Statement
Travellers exploring Sri Lanka face a scattered set of resources — blogs, generic
map apps, and word of mouth — to figure out what's actually worth visiting in a
given district, whether it matches what they're after (temples, adventure,
beaches, hiking, wildlife, and more), and in what order to visit everything on
their list without doubling back across the country.

Ceylora gives travellers a single, curated directory of 54 Sri Lankan
destinations that can be searched by district or province, filtered by
interest, and assembled into a day-by-day trip with a one-tap route optimizer.

## Features

### Splash Screen
An animated launch screen (`components/app-splash.tsx`) shows the Ceylora logo
and a loading bar for ~1.2s before handing off to the main app.

### Home — Discover
- Time-of-day greeting ("Good morning/afternoon/evening") and a search bar
  that matches destination name, district, or province as you type.
- Category filter chips for all 8 interest types: Faith & Heritage, Fun &
  Adventure, Nature & Wildlife, Beaches, Hill Country, Culture & History,
  Wellness, and Food & Markets.
- A horizontally-scrolling **Featured Experiences** rail (destinations tagged
  with a `bestFor` highlight, e.g. "Sunrise hike", "Whale watching Nov–Apr"),
  shown when no search or filter is active.
- A full destination list below, each card showing name, district/province,
  primary category tag, and whether nearby stays exist.
- Tap the ☆ / ★ star on any card to bookmark it straight to your trip without
  opening the detail screen.

### Destination Detail
Tap any destination to see:
- A gradient hero banner (color-toned by category) with a large category icon.
- Full name, district/province, and all category tags for that place.
- A "Best for" highlight banner when the destination has one (peak season,
  best time of day, etc.).
- Full description and, if available, nearby stay-type tags (Hotel, Resort,
  Villa, Guesthouse, Eco-lodge).
- **Open in Maps** — deep-links to the destination's coordinates in the
  device's default maps app.
- **Add to Trip / Remove from Trip** — toggles the destination in your trip
  bucket list.

### Trip Planner
- Shows every destination you've bookmarked, in the order you added them.
- **Optimize Route** — reorders your stops using a nearest-neighbour
  heuristic (Haversine great-circle distance) starting from Colombo, a
  simple, explainable approximation of the travelling-salesman problem that
  avoids doubling back across the island. Tap again to switch back to
  add-order.
- Shows the distance (km) from the previous stop for each leg, and the trip's
  total distance from Colombo.
- Flags when your added order is already the shortest possible route.
- Remove any stop from the list with the ✕ button.
- Empty state prompts you to add destinations from Home.

### Settings
- **Dark Mode** toggle — switches the whole app between light and dark color
  palettes instantly.
- **About Ceylora** card with a short description and version number.

## Screens
1. **Home** ([app/(tabs)/index.tsx](<app/(tabs)/index.tsx>)) — destination list, search, category filter, featured rail.
2. **Destination Detail** ([app/destination/[id].tsx](<app/destination/[id].tsx>)) — full details, map link, add/remove trip.
3. **Trip Planner** ([app/(tabs)/trip.tsx](<app/(tabs)/trip.tsx>)) — bucket list + route optimizer.
4. **Settings** ([app/(tabs)/settings.tsx](<app/(tabs)/settings.tsx>)) — dark mode, about.

## State & Architecture
- `useState` for search text and selected category (Home), and the
  optimize/added-order toggle (Trip).
- **React Context** ([context/trip.tsx](context/trip.tsx)) shares the trip bucket list across
  Home, Detail, and Trip screens without prop drilling.
- **React Context** ([context/theme.tsx](context/theme.tsx)) shares the light/dark theme and a
  small design-token system (`spacing`, `radius`) the same way, driven by the
  toggle in Settings.
- [lib/route.ts](lib/route.ts) holds the pure route-optimization logic (Haversine distance +
  greedy nearest-neighbour ordering) — no external API required.
- [data/destinations.ts](data/destinations.ts) holds the 54-destination dataset plus category and
  stay-type display metadata (labels/icons) used across the app.
- Reusable UI components: [components/destination-card.tsx](components/destination-card.tsx) (list/featured
  cards), [components/destination-hero.tsx](components/destination-hero.tsx) (gradient category banner),
  [components/ui/button.tsx](components/ui/button.tsx) (primary/secondary/tertiary button), and
  [components/app-splash.tsx](components/app-splash.tsx) (launch screen).

## Design Note
Destination coordinates power an "Open in Maps" deep link rather than an
embedded interactive map, to avoid requiring a Google Maps API key / native map
config. The link opens the location directly in the device's Maps app.
Since no photography assets are bundled, each destination is represented by a
gradient + icon "hero" banner, tonally grouped by category (teal / forest /
sand) rather than a photo.

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
   Platform-specific shortcuts are also available:
   ```bash
   npm run android   # open directly in an Android emulator/device
   npm run ios       # open directly in an iOS simulator/device
   npm run web       # run in a browser
   ```
3. Scan the QR code with Expo Go on Android/iOS, or press `a` / `i` / `w` in
   the terminal to launch an emulator/simulator/browser.
4. `npm run lint` runs ESLint over the project.

## Screenshots
_Add screenshots of the Home, Destination Detail, Trip Planner, and Settings
screens here before submission._
