// ============================================================
// MockAPI configuration
//
// 1. Sign up at https://mockapi.io and create a new project.
// 2. Inside the project, create a resource named "tripitems" with
//    this schema (Settings → Edit resource → add fields):
//      destinationId : string
//      name          : string
//      district      : string
//      notes         : string
//      order         : number
//      addedAt       : string
// 3. Copy the "API endpoint" base URL shown on your project's dashboard
//    (looks like https://<projectId>.mockapi.io — no /api/v1 suffix on
//    newer MockAPI projects) and paste it below.
// ============================================================

export const MOCKAPI_BASE_URL = "https://6aa2b5acccb3db9689a6f271.mockapi.io";

export const TRIP_ITEMS_ENDPOINT = `${MOCKAPI_BASE_URL}/tripitems`;
