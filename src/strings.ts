const HEADER_TITLE = "Metro Transit NexTrip";
const ROUTE_PICKER_HEADER = "Choose A Route";
const ROUTE_PICKER_FILTER_LABEL = "Filter Routes";

type Endpoint = "routes" | "directions" | "stops";
const FETCH_ERROR_TEMPLATE = (endpoint: Endpoint) =>
  `Could not fetch ${endpoint}. Please try starting over.`;

const DIRECTION_PICKER_HEADER = "Choose A Direction";
const SEARCH_RESULTS_HEADER = "Stops";
const ERROR_BOUNDARY_MESSAGE = "Oops! Something went wrong. Please try again.";

export {
  HEADER_TITLE,
  ROUTE_PICKER_HEADER,
  ROUTE_PICKER_FILTER_LABEL,
  FETCH_ERROR_TEMPLATE,
  DIRECTION_PICKER_HEADER,
  SEARCH_RESULTS_HEADER,
  ERROR_BOUNDARY_MESSAGE,
};
