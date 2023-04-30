import { useJobs } from "../hooks/use-jobs";

import { CandidateJobCard } from "./CandidateJobCard";
import { MobileCandidateJobCard } from "../mobile/MobileCandidateJobCard";
import { useLocations } from "@/features/locations/hooks/use-locations";

export function CandidatesJobList() {
  const { jobs, isEmpty } = useJobs();
  const { selectedLocation } = useLocations();

  return (
    <ul className="md:overflow-auto md:max-h-[calc(100vh-208px)] px-4 mb-10 md:mb-0">
      {isEmpty ? (
        <div className="flex items-center justify-center p-10">
          <h2>Não há vagas cadastradas ainda {selectedLocation?.label}</h2>
        </div>
      ) : null}
      {jobs.map((jobItem) => (
        <>
          <CandidateJobCard key={jobItem.id} job={jobItem} />
          <MobileCandidateJobCard key={jobItem.id} job={jobItem} />
        </>
      ))}
    </ul>
  );
}
