import { useCallback } from "react";
import { getRoutes } from "../services/metroTransitService";
import useFetch from "./useFetch";

/**
 * A convenience hook that fetches routes.
 *
 * @returns An object containing the loading state, error message (if any), and fetched data.
 */
const useGetRoutes = () => {
  const fetchCallback = useCallback(async () => {
    return await getRoutes();
  }, []);

  const { isLoading, error, data } = useFetch(fetchCallback, []);

  // Let the error boundary handle it
  if (error) {
    throw error;
  }

  return { isLoading, data };
};

export default useGetRoutes;
