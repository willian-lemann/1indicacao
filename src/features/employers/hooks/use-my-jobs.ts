import { api } from "@/utils/api";

export function useMyJobs() {
  const { data, isLoading, error } = api.jobs.getAllByMe.useQuery(undefined, {
    staleTime: 1000 * 5,
    cacheTime: 1000 * 5,
  });

  return {
    jobs: !data ? [] : data,
    isEmpty: data?.length === 0,
    error,
    isLoading,
  };
}
