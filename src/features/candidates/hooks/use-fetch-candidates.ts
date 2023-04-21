import { api } from "@/utils/api";
import { useCandidates } from "./use-candidates";

export function useFetchCandidates() {
  const { setCandidates } = useCandidates();

  api.users.getAllCandidates.useQuery(undefined, {
    onSuccess: (newCandidates) => {
      setCandidates(newCandidates);
    },
  });
}
