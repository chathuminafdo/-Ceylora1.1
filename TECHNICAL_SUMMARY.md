# Technical Summary — Ceylora Sprint 2

## Application Architecture

Ceylora is an Expo Router app organised around three layers: **screens**
(`app/`), **shared state** (`context/`), and **data access** (`lib/`,
`data/`). Screens stay declarative — they read state from context hooks and
call the actions those hooks expose, with no direct API or storage calls
inside components. This kept the Sprint 2 work additive: the Home,
Destination Detail, and Trip Planner screens didn't need to know *how* the
trip list is persisted, only that `useTrip()` gives them `tripItems`,
`loading`, `error`, and a set of mutator functions.

The 54-destination catalogue (`data/destinations.ts`) remains static local
data — it's reference content, not user data, so there's no reason to serve
it from an API. The feature that actually needed a backend was the **trip
bucket list**: a per-user, mutable collection that previously lived only in
`useState` and vanished on every app restart. That gap is what Sprint 2
targets.

## API Integration Approach

I created a MockAPI resource, `tripitems`, with fields `destinationId`,
`name`, `district`, `notes`, and `addedAt`. Rather than duplicating full
destination records into the API, each trip item stores just a foreign key
(`destinationId`) plus the small amount of denormalised data needed to
render a row without a second lookup, and a `notes` field for the sprint's
CRUD write path. `lib/api.ts` wraps `fetch` in a typed `request<T>()`
helper with an `AbortController`-based timeout, exposing four functions:
`fetchTripItems` (GET), `createTripItem` (POST), `updateTripItem` (PUT),
and `deleteTripItem` (DELETE) — covering all four CRUD operations rather
than the minimum three required.

`context/trip.tsx` owns the state machine around these calls. On mount it
loads the AsyncStorage cache synchronously into state (so the UI is never
blank) and immediately fires a `GET` in the background to reconcile with
the server. Every mutation — add, remove, edit note — follows the same
pattern: apply the change to local state and the cache *first* (optimistic
update), fire the network request, and only roll the change back if the
request throws. This makes the UI feel instant on a phone even over a slow
connection, while still surfacing failures honestly through an `error`
string the Trip Planner renders as a dismissable banner with a Retry
button.

## Local Persistence

`lib/storage.ts` wraps `@react-native-async-storage/async-storage` around a
single JSON blob keyed `ceylora:tripItems`. It's intentionally the simplest
option that satisfies "local storage for at least one entity" — the trip
list is small (a handful of items at most) and doesn't need SQLite's query
capabilities. The cache is best-effort: read/write failures are swallowed
rather than surfaced, since losing the cache should degrade to "fetch from
the network" rather than crash the app.

## Challenges & Decisions

The main design decision was **where optimistic-update rollback state
should live**. Keeping temporary IDs (`temp-${Date.now()}`) in the trip
item itself, rather than a separate "pending" flag, meant the reconciliation
logic (swap the temp item for the server's real one, or remove it on
failure) stayed a simple array `.map`/`.filter` instead of a second piece of
state to keep in sync.

The second challenge was **changing the trip context's public shape**
without breaking the three screens that already depended on it. `addToTrip`
previously took a destination `id`; it now takes the full `Destination`
object, since the API record needs `name`/`district` at creation time. That
required updating call sites in `app/(tabs)/index.tsx` and
`app/destination/[id].tsx`, while `removeFromTrip` and `isInTrip` kept their
existing `id`-based signature, since deletion and lookup only ever needed
the key.

Finally, since MockAPI requires a student-specific project URL that can't be
hardcoded, `lib/config.ts` isolates that one setting with inline setup
instructions, so the rest of the codebase has no knowledge of whose project
it's talking to.
