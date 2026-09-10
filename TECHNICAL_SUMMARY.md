# Technical Summary — Ceylora Sprint 2

## Application Architecture

Ceylora is an Expo Router app organised around three layers: **screens**
(`app/`), **shared state** (`context/`), and **data access** (`lib/`,
`data/`). Screens stay declarative — they read state from context hooks and
call the actions those hooks expose, with no direct API or storage calls
inside components. The Home, Destination Detail, and Trip Planner screens
don't need to know *how* the trip list is persisted, only that `useTrip()`
gives them `tripItems`, `loading`, `error`, and a set of mutator functions.

The 54-destination catalogue (`data/destinations.ts`) remains static local
data — it's reference content, not user data, so there's no reason to serve
it from an API. The feature that needed a backend was the **trip bucket
list**: a per-user, mutable collection that previously lived only in
`useState` and vanished on every app restart.

## API Integration Approach

I created a MockAPI resource, `tripitems`, with fields `destinationId`,
`name`, `district`, `notes`, `order` (the stop's position in the trip), and
`addedAt`. Rather than duplicating full destination records into the API,
each trip item stores just a foreign key (`destinationId`) plus the small
amount of denormalised data needed to render a row without a second lookup.
`lib/api.ts` wraps `fetch` in a typed `request<T>()` helper with an
`AbortController`-based timeout, exposing `fetchTripItems` (GET),
`createTripItem` (POST), `updateTripItem` (PUT), and `deleteTripItem`
(DELETE) — all four CRUD operations rather than the minimum three required.

## Local Persistence — Local-First, Not Just a Cache

`context/trip.tsx` treats `AsyncStorage` (via `lib/storage.ts`) as the
**source of truth**, not a cache the server can overwrite. Every mutation
(add, remove, edit note, reorder) applies to state and storage immediately
and **stays applied even if the matching API request fails** — a network
error only surfaces as a dismissable banner with a Retry button; it never
reverts the user's change. This was a deliberate revision from an earlier
optimistic-update-with-rollback design: rollback meant a stop could flash
in and silently vanish if the request failed, which defeats the point of
having local storage at all on an unreliable mobile connection.

Two mechanisms keep the background `GET` sync from clobbering that local
state: the cache loads and applies to state *before* the first `refresh()`
is even called, so a slow network response can't race a fast cache read;
and the sync merges server data on top of local state (keeping unsynced
local additions, and respecting a small `pendingDeleteIds` cache so a
local deletion that hasn't reached the server isn't resurrected by the
next GET).

## Additional Features Built On Top

Two features extend beyond the minimum brief, both wired the same
local-first way as the rest of the app. **Drag-to-reorder**
(`react-native-draggable-flatlist`) lets a stop's position drive an `order`
field synced through the same PUT endpoint used for notes. **Embedded maps**
(`react-native-maps`) show a pinned location per destination and a
multi-stop route map with a road-snapped polyline (OSRM's free routing API,
falling back to a straight line if that request fails).

## Challenges & Decisions

The trickiest bug was a **forced remount on the reorder list**: an early
version kept a React `key` on the draggable list that changed whenever the
Optimize Route toggle flipped, to force a clean re-render — a habit carried
over from plain `FlatList`. That actively broke Reanimated/gesture-handler,
which don't tolerate their native views being torn down mid-gesture under
the New Architecture, causing crashes and leaving the drag gesture broken
until a further remount "fixed" it. The list already reconciles a changed
`data` array correctly via `keyExtractor` on its own, so removing the
forced remount fixed both symptoms with one change.

Since MockAPI requires a student-specific project URL that can't be
hardcoded, `lib/config.ts` isolates that one setting with inline setup
instructions, so the rest of the codebase has no knowledge of whose project
it's talking to.
