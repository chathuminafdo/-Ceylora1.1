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
// 3. Copy your project's base URL (Project → click the resource →
//    the URL shown looks like:
//      https://<projectId>.mockapi.io/api/v1
//    and paste it below, replacing the placeholder.
// ============================================================

export const MOCKAPI_BASE_URL =
  "https://REPLACE_WITH_YOUR_MOCKAPI_PROJECT_ID.mockapi.io/api/v1";

export const TRIP_ITEMS_ENDPOINT = `${MOCKAPI_BASE_URL}/tripitems`;
