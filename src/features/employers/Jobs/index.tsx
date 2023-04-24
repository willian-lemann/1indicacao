import { useAuth } from "@/features/authentication/hooks/use-auth";

import AddJob from "@/features/employers/AddJob";

import { EmployersJobList } from "./EmployersJobList";
import { CandidatesJobList } from "./CandidatesJobList";
import { classnames } from "@/utils/classnames";
import { useFetchJobs } from "../hooks/use-fetch-jobs";

export function Jobs() {
  const { isEmployer } = useAuth();
  useFetchJobs();

  return (
    <div className="px-8 md:container py-4 z-0">
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
          "mt-4 text-primary font-semibold p-6 hidden md:grid"
        )}
      >
        {isEmployer ? null : <p>Nome</p>}
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
