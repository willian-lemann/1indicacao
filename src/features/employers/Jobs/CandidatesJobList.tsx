import { useJobs } from "../hooks/use-jobs";

import { dayjs } from "@/lib/dayjs";
import { Status } from "./Status";
import { SeeJobDetails } from "./SeeJobDetails";
import { CandidateJobCard } from "./CandidateJobCard";
import { MobileCandidateJobCard } from "../mobile/MobileCandidateJobCard";

export function CandidatesJobList() {
  const { jobs, isEmpty } = useJobs();

  return (
    <ul>
      {isEmpty ? (
        <div className="flex items-center justify-center p-10">
          <h2>Não há vagas cadastradas ainda</h2>
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
