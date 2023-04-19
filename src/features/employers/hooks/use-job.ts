import { api } from "@/utils/api";

type Params = {
  id: string;
};

export function useJob({ id }: Params) {
  const { data, isLoading } = api.jobs.byId.useQuery({ id });

  return {
    job: data,
    isLoading,
  };
}
