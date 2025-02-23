import { useCallback } from "react";
import { getRoutes } from "../services/metroTransitService";
import useFetch from "./useFetch";
import { FETCH_ERROR_TEMPLATE } from "../strings";

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

  const error = isError ? FETCH_ERROR_TEMPLATE("routes") : null;

  return { isLoading, error, data };
};

export default useGetRoutes;
