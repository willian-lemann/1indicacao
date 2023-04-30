import { useAuth } from "@/features/authentication/hooks/use-auth";
import { create } from "@/lib/store";
import { useEffect } from "react";
import { LocationOption } from "../types/location-option";
import { LocationStore } from "../types/location-store";

const locationsStore = create<LocationStore>()((set) => ({
  locations: [],
  selectedLocation: null,
  setLocation: (selectedLocation) => set({ selectedLocation }),
}));

export function useLocations() {
  const state = locationsStore((state) => state);

  return {
    ...state,
  };
}
