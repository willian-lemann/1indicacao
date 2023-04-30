import { useJobs } from "../hooks/use-jobs";

import { EmployerJobCard } from "./EmployerJobCard";
import { MobileEmployerJobCard } from "../mobile/MobileEmployerJobCard";

export function EmployersJobList() {
  const { jobs, isEmpty } = useJobs();

  return (
    <ul className="mt-10 md:mt-0">
      {isEmpty ? (
        <div className="flex items-center text-center justify-center p-10">
          <h2>Você ainda nao cadastrou nenhuma vaga</h2>
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
