import { useAuth } from "@/features/authentication/hooks/use-auth";

import { classnames } from "@/utils/classnames";

import { useLocations } from "@/features/locations/hooks/use-locations";
import { useCompanies } from "../hooks/use-companies";
import { Company } from "./Company";

export function Companies() {
  const { selectedLocation } = useLocations();
  const { companies, isEmpty } = useCompanies();

  return (
    <div className="px-8 md:container py-4 z-0 relative">
      <div className="flex mt-4 md:mt-0 items-center justify-between">
        <h1 className="text-lg">
          Empresas em
          <span className="pl-1 animate-fadeIn">{selectedLocation?.label}</span>
        </h1>
      </div>

      {isEmpty ? (
        <div className="md:p-20 p-10 text-center w-full flex justify-center">
          <h2>
            Não há empresas cadastradas ainda em {selectedLocation?.label}
          </h2>
        </div>
      ) : (
        <ul
          className={classnames(
            "grid-cols-3 mt-4 text-primary font-semibold md:px-10 md:py-4 md:grid"
          )}
        >
          {companies.map((company) => (
            <Company key={company.id} company={company} />
          ))}
        </ul>
      )}
    </div>
  );
}
