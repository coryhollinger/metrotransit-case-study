import { useCallback } from "react";
import { getNextDeparture } from "../services/metroTransitService";
import useFetch from "./useFetch";

/**
 * A convenience hook that fetches directions for a given route ID.
 *
 * @param routeId - The ID of the route for which to fetch directions.
 * @returns An object containing the loading state, error message (if any), and fetched data.
 */
const useGetNextDeparture = (
  routeId: string,
  direction: string,
  placeCode: string
) => {
  const fetchCallback = useCallback(async () => {
    if (!routeId || !direction || !placeCode) {
      throw new Error("Missing required parameters");
    }
    return await getNextDeparture(routeId, direction, placeCode);
  }, [routeId, direction, placeCode]);

  const { isLoading, error, data } = useFetch(fetchCallback, {
    departures: [],
  });

  return { isLoading, error, data };
};

export default useGetNextDeparture;
