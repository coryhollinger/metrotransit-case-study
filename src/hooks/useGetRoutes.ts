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

  const { isLoading, isError, data } = useFetch(fetchCallback, []);

  const error = isError
    ? `Could not fetch routes. Please try reloading the page.`
    : null;

  return { isLoading, error, data };
};

export default useGetRoutes;
