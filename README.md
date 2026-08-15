# BloodLink — Blood Donor Directory

## Target Domain
Healthcare — emergency blood supply coordination.

## Problem Statement
When a hospital or blood bank needs blood urgently, coordinators currently work through
paper lists or spreadsheets, calling donors one by one until they find someone with the
right blood type who is actually available. This is slow and error-prone in a
time-critical situation.

BloodLink gives a hospital/blood bank coordinator a searchable, filterable directory of
registered donors so they can immediately see who has a compatible blood type, where
they are located, and whether they are currently available to donate.

## How the App Solves It
- **Home screen** — a `FlatList` of donors with a search bar (by name or area) and
  blood-type filter chips, so a coordinator can narrow a list of donors down to
  "O- donors near Colombo" in seconds instead of scrolling a spreadsheet.
- **Donor Detail screen** — tap any donor to see their phone number, last donation
  date, and an availability toggle, plus a one-tap "Call Donor" button.
- **Settings screen** — set a default blood-type filter so the Home screen opens
  already scoped to the type the coordinator needs most often.

## Screens
1. **Home** (`app/(tabs)/index.tsx`) — donor list, search, blood-type filter.
2. **Donor Detail** (`app/donor/[id].tsx`) — full donor profile, availability toggle.
3. **Settings** (`app/(tabs)/settings.tsx`) — default blood-type filter preference.

## State (`useState`)
- Search text and selected blood-type filter on the Home screen.
- Availability toggle on the Donor Detail screen.
- Default blood-type preference on the Settings screen.

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
_Add screenshots of the Home, Donor Detail, and Settings screens here before submission._
