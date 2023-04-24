import { useJobs } from "../hooks/use-jobs";

import { useAuth } from "@/features/authentication/hooks/use-auth";
import { EmployerJobCard } from "./EmployerJobCard";
import { MobileEmployerJobCard } from "../mobile/MobileEmployerJobCard";

export function EmployersJobList() {
  const { jobs, isEmpty } = useJobs();
  const { isCandidate } = useAuth();

  return (
    <ul className="mt-10 md:mt-0">
      {isEmpty ? (
        <div className="flex items-center justify-center p-10">
          <h2>Não há vagas cadastradas</h2>
        </div>
      ) : null}
      {jobs.map((jobItem) => (
        <>
          <EmployerJobCard key={jobItem.id} job={jobItem} />
          <MobileEmployerJobCard key={jobItem.id} job={jobItem} />
        </>
      ))}
    </ul>
  );
}
