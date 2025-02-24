import { useState, useEffect } from "react";
import { resetCache } from "../services/metroTransitService";

/**
 * A custom hook that fetches data from an API and handles loading and error states.
 *
 * @param fetchFunc - The function that fetches data from the API and returns type T.
 * @param defaultValue - The default value of type T.
 * @returns An object containing the loading state, error state, and fetched data.
 */
const useFetch = <T extends object>(
  fetchFunc: () => Promise<T>,
  defaultValue: T
) => {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const internalFetch = async () => {
      setIsLoading(true);
      try {
        setData(await fetchFunc());
      } catch (e) {
        // Return the error to let the calling hooks handle it
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error("An error occurred while fetching data."));
        }
        // Nuke the cache to try to fix
        resetCache();
      }
      setIsLoading(false);
    };

    internalFetch();
  }, [fetchFunc]);

  return { isLoading, error, data };
};

export default useFetch;
