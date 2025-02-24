export interface DirectionResponse {
  direction_id: number;
  direction_name: string;
}

export interface RouteResponse {
  route_id: string;
  route_label: string;
}

export interface StopResponse {
  place_code: string;
  description: string;
}

export interface NexTripResponse {
  departures: Departure[];
}

export interface Departure {
  departure_time: number;
  departure_text: string;
}