import { api } from "@/utils/api";

export function useJobs() {
  const { data, isLoading } = api.jobs.getAll.useQuery();

  return {
    jobs: !data ? [] : data,
    isLoading,
    isEmpty: data?.length === 0,
  };
}
