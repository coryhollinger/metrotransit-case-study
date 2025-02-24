import { useCallback } from "react";
import { getStops } from "../services/metroTransitService";
import useFetch from "./useFetch";

/**
 * A convenience hook that fetches stops for a given route ID and direction.
 *
 * @param routeId - The ID of the route for which to fetch stops.
 * @param direction - The direction for which to fetch stops.
 * @returns An object containing the loading state, error message (if any), and fetched data.
 */
const useGetStops = (routeId: string, direction: string) => {
  const fetchCallback = useCallback(async () => {
    if (!routeId || !direction) {
      throw new Error("Missing required parameters");
    }
    return await getStops(routeId, direction);
  }, [routeId, direction]);

  const { isLoading, data } = useFetch(fetchCallback, []);

  return { isLoading, data };
};

export default useGetStops;
