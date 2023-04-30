import { LocationOption } from "./location-option";

export type LocationStore = {
  locations: LocationOption[];
  selectedLocation: LocationOption | null;
  setLocation(selectedLocation: LocationOption): void;
};
