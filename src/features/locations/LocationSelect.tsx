import ReactSelect from "react-select";
import { LocationOption } from "@/features/locations/types/location-option";
import { useLocations } from "./hooks/use-locations";
import { useAuth } from "../authentication/hooks/use-auth";

type ReactSelectProps = {
  locations: LocationOption[];
};

export function LocationSelect({ locations }: ReactSelectProps) {
  const { selectedLocation, setLocation } = useLocations({
    initialLocations: locations,
  });

  return (
    <ReactSelect
      placeholder="Selecione uma região"
      options={locations}
      value={selectedLocation}
      onChange={(option) => setLocation(option as LocationOption)}
      classNames={{
        container: () => "focus:!primary",
        control: () => "!py-0.5 !text-sm !rounded-md !w-[200px]",
        option: () =>
          "!bg-primary hover:!bg-white hover:!text-primary !cursor-pointer !text-white !transition-colors",
        menuList: () => "!bg-primary !overflow-hidden !rounded-md",
      }}
    />
  );
}
