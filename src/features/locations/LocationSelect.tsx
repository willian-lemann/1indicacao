import ReactSelect from "react-select";
import { LocationOption } from "@/features/locations/types/location-option";
import { useLocations } from "./hooks/use-locations";
import { useAuth } from "../authentication/hooks/use-auth";
import { useEffect } from "react";

type ReactSelectProps = {
  locations: LocationOption[];
};

export function LocationSelect({ locations }: ReactSelectProps) {
  const { selectedLocation, setLocation } = useLocations();
  const { user } = useAuth();

  const defaultLocation = locations.find(
    (location) => location.value === user.locationId
  );

  useEffect(() => {
    setLocation(defaultLocation as LocationOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation]);

  return (
    <ReactSelect
      placeholder="Selecione uma região"
      options={locations}
      value={selectedLocation || defaultLocation}
      onChange={(option) => setLocation(option as LocationOption)}
      classNames={{
        input: () => "!outline-none",
        container: () => "!outline-none",
        control: () => "!py-0.5 !text-sm !rounded-md !w-[200px]",
        option: () =>
          "!bg-primary hover:!bg-white hover:!text-primary !cursor-pointer !text-white !transition-colors",
        menuList: () => "!bg-primary !overflow-hidden !rounded-md",
      }}
    />
  );
}
