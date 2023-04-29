import { useAuth } from "@/features/authentication/hooks/use-auth";

import AddJob from "@/features/employers/AddJob";

import { EmployersJobList } from "./EmployersJobList";
import { CandidatesJobList } from "./CandidatesJobList";
import { classnames } from "@/utils/classnames";
import { useFetchJobs } from "../hooks/use-fetch-jobs";
import ReactSelect from "react-select";
import { api } from "@/utils/api";

export function Jobs() {
  const { isEmployer, isCandidate } = useAuth();
  useFetchJobs();

  const { data } = api.locations.getAll.useQuery();

  const locationOptions = data?.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  return (
    <div className="px-8 md:container py-4 z-0 relative">
      {isEmployer ? (
        <div className="flex mt-4 md:mt-0 items-center justify-between">
          <h1 className="text-lg">Minhas Vagas</h1>

          <AddJob />
        </div>
      ) : null}

      <div
        className={classnames(
          isEmployer
            ? "grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr]"
            : "grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr]",
          "mt-4 text-primary font-semibold px-10 py-4 hidden md:grid"
        )}
      >
        {isCandidate ? <p>Nome</p> : null}
        <p className="flex items-center">Nº de Vagas</p>
        <p className="flex items-center">Remuneração</p>
        <p className="flex items-center">Status</p>
        <p className="flex items-center">Postado em</p>
        {isEmployer ? <p className="flex items-center">Mudar status</p> : null}
      </div>

      {isEmployer ? <EmployersJobList /> : <CandidatesJobList />}
    </div>
  );
}
