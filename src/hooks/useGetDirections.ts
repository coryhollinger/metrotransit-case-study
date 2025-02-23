import { useCallback } from "react";
import { getDirections } from "../services/metroTransitService";
import useFetch from "./useFetch";
import { FETCH_ERROR_TEMPLATE } from "../strings";

/**
 * A convenience hook that fetches directions for a given route ID.
 *
 * @param routeId - The ID of the route for which to fetch directions.
 * @returns An object containing the loading state, error message (if any), and fetched data.
 */
const useGetDirections = (routeId: string) => {
  const fetchCallback = useCallback(async () => {
    return await getDirections(routeId);
  }, [routeId]);

  const { isLoading, isError, data } = useFetch(fetchCallback, []);

  const error = isError ? FETCH_ERROR_TEMPLATE("directions") : null;

  return { isLoading, error, data };
};

export default useGetDirections;
