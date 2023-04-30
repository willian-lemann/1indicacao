import { useLocations } from "@/features/locations/hooks/use-locations";
import { addCookie, getCookie } from "@/lib/cookies";
import { create } from "@/lib/store";
import { useEffect } from "react";
import { CompaniesStore } from "../types/companies-store";

const companiesStore = create<CompaniesStore>()((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
}));

export function useCompanies() {
  const state = companiesStore((state) => state);
  const { selectedLocation } = useLocations();

  const filteredCompanies = state.companies.filter(
    (company) => company.locationId === selectedLocation?.value
  );

  const companies = filteredCompanies;

  return {
    ...state,
    isEmpty: companies.length === 0,
    companies,
  };
}
