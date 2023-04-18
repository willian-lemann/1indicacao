import { api } from "@/utils/api";

export function useJobs() {
  const { data } = api.jobs.getAll.useQuery();

  return {
    jobs: !data ? [] : data,
  };
}
