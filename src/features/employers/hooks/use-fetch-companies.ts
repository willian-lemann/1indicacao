import { api } from "@/utils/api";
import { useCompanies } from "./use-companies";

export function useFetchCompanies() {
  const { setCompanies } = useCompanies();

  api.users.getAllCompanies.useQuery(undefined, {
    onSuccess: (newCompanies) => {
      console.log(newCompanies);
      setCompanies(newCompanies);
    },
  });
}
