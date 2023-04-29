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

type UseLocationsProps = {
  initialLocations: LocationOption[];
};

export function useLocations(props?: UseLocationsProps) {
  const state = locationsStore((state) => state);
  const { user } = useAuth();

  useEffect(() => {
    if (props?.initialLocations) {
      state.locations = props?.initialLocations as LocationOption[];

      const defaultLocation = props.initialLocations.find(
        (location) => location.value === user.locationId
      );

      if (defaultLocation) {
        state.selectedLocation = defaultLocation;
      }
    }
  }, [props?.initialLocations, state, user]);
  return {
    ...state,
  };
}
