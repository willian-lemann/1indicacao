import { api } from "@/utils/api";

export function useMyJobs() {
  const { data, isLoading, error } = api.jobs.getAllByMe.useQuery();

  return {
    jobs: !data ? [] : data,
    isEmpty: data?.length === 0,
    error,
    isLoading,
  };
}
