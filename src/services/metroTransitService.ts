import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { RouteResponse, DirectionResponse, StopResponse } from "../models";

const instance = Axios.create({
  baseURL: "https://svc.metrotransit.org/nextrip",
  timeout: 5000,
});

const metroTransitAxios = setupCache(instance);

const getRoutes = async (): Promise<RouteResponse[]> => {
  const response = await metroTransitAxios.get("/routes");
  if (response.status !== 200) {
    throw new Error("Failed to fetch routes");
  }
  return response.data;
};

const getDirections = async (route: string): Promise<DirectionResponse[]> => {
  const response = await metroTransitAxios.get(`/directions/${route}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch directions");
  }

  return response.data;
};

const getStops = async (
  route: string,
  direction: string
): Promise<StopResponse[]> => {
  const response = await metroTransitAxios.get(`/stops/${route}/${direction}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch stops");
  }

  return response.data;
};

export { getRoutes, getDirections, getStops, metroTransitAxios };
