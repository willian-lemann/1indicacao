import { useJobs } from "@/features/employers/hooks/use-jobs";
import { api } from "@/utils/api";

export function useFetchJobs() {
  const { setJobs } = useJobs();

  api.jobs.getAll.useQuery(undefined, {
    onSuccess: (newValues) => {
      setJobs(newValues);
    },
  });
}
