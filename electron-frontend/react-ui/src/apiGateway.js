export const API_ROUTES = {

    BASE_URL: "localhost:8081",
    // GuitarController endpoints
    POST_ADD_GUITAR: "/api/v1/guitars",
    GET_GUITAR_BY_ID: "/api/v1/guitars/id", // Requires `id` as a query parameter
    GET_ALL_GUITARS: "/api/v1/guitars",
    GET_GUITARS_BY_MANUFACTURER: "/api/v1/guitars/manufacturer", // Requires `name` as a query parameter
    GET_GUITARS_BY_BRIDGE: "/api/v1/guitars/bridge", // Requires `bridge` as a query parameter
    GET_GUITARS_BY_PROJECT: "/api/v1/guitars/project", // Requires `project` as a query parameter
    GET_GUITARS_BY_STRINGS: "/api/v1/guitars/strings", // Requires `strings` as a query parameter
    GET_GUITARS_BY_STRING_GAUGE: "/api/v1/guitars/gauge", // Requires `gauge` as a query parameter
    GET_GUITARS_BY_SCALE: "/api/v1/guitars/scale", // Requires `scale` as a query parameter
    GET_GUITARS_BY_TUNING: "/api/v1/guitars/tuning", // Requires `tuning` as a query parameter
    DELETE_GUITAR: "/api/v1/guitars", // Requires `id` as a query parameter
  
    // MaintenanceController endpoints
    POST_ADD_MAINTENANCE: "/api/v1/maintenance", // Requires `maintenance` in the body
    GET_MAINTENANCE_BY_ID: "/api/v1/maintenance/id", // Requires `id` as a query parameter
    GET_ALL_MAINTENANCES: "/api/v1/maintenance",
    GET_MAINTENANCES_BY_GUITAR: "/api/v1/maintenance/guitar", // Requires `id` as a query parameter
    GET_MAINTENANCES_BY_TYPE: "/api/v1/maintenance/type", // Requires `type` as a query parameter
    GET_MAINTENANCES_BY_DATE: "/api/v1/maintenance/date", // Requires `date` as a query parameter
    DELETE_MAINTENANCE: "/api/v1/maintenance", // Requires `maintenanceId` as a query parameter
  };
  