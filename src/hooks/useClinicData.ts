import { useEffect, useState, useCallback, useRef } from "react";

interface UseClinicDataResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * useClinicData
 * Handles fetching, caching, loading, error, and refetching states.
 *
 * @param fetchFn - Async function to fetch clinic data
 * @param cacheKey - Optional cache key for memoized results
 */
export const useClinicData = <T>(
  fetchFn: () => Promise<T[]>,
  cacheKey: string
): UseClinicDataResult<T> => {
  const cache = useRef<Map<string, T[]>>(new Map());
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (cache.current.has(cacheKey)) {
        setData(cache.current.get(cacheKey)!);
        setLoading(false);
        return;
      }

      const result = await fetchFn();
      setData(result);
      cache.current.set(cacheKey, result); 
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [fetchFn, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(async () => {
    cache.current.delete(cacheKey);
    await fetchData();
  }, [fetchData, cacheKey]);

  return { data, loading, error, refetch };
};
