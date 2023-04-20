import { api } from "@/utils/api";

export function useCandidates() {
  const { data, isLoading } = api.users.getAllCandidates.useQuery();

  return {
    candidates: !data ? [] : data,
    isEmpty: data?.length === 0,
    isLoading,
  };
}
