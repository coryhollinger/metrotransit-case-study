import { useCallback } from "react";
import { getDirections } from "../services/metroTransitService";
import useFetch from "./useFetch";

/**
 * A convenience hook that fetches directions for a given route ID.
 *
 * @param routeId - The ID of the route for which to fetch directions.
 * @returns An object containing the loading state, error message (if any), and fetched data.
 */
const useGetDirections = (routeId: string) => {
  const fetchCallback = useCallback(async () => {
    if (!routeId) {
      throw new Error("Missing required parameters");
    }
    return await getDirections(routeId);
  }, [routeId]);

  const { isLoading, error, data } = useFetch(fetchCallback, []);

  // Let the error boundary handle it
  if (error) {
    throw error;
  }

  return { isLoading, data };
};

export default useGetDirections;
