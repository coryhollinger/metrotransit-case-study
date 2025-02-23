import { useState, useEffect } from "react";
import { metroTransitAxios } from "../services/metroTransitService";

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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const internalFetch = async () => {
      setIsLoading(true);
      try {
        setData(await fetchFunc());
      } catch {
        setIsError(true);
        // Nuke the cache to try to fix. Apparently clear can be undefined, so check first.
        if (metroTransitAxios.storage.clear) {
          await metroTransitAxios.storage.clear();
        }
      }
      setIsLoading(false);
    };

    internalFetch();
  }, [fetchFunc]);

  return { isLoading, isError, data };
};

export default useFetch;
