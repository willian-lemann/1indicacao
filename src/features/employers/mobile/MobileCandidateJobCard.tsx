import { useAuth } from "@/features/authentication/hooks/use-auth";
import { dayjs } from "@/lib/dayjs";
import { SeeJobDetails } from "../Jobs/SeeJobDetails";

import { Status } from "../Jobs/Status";
import CustomSwitch from "../Switch";
import { Job } from "../types/job";

type MobileCandidatesJobListProps = {
  job: Job;
};

export function MobileCandidateJobCard({ job }: MobileCandidatesJobListProps) {
  return (
    <li
      key={job.id}
      className="flex  justify-between flex-col md:hidden border py-10 px-6 md:p-6 rounded text-primary/90 mb-4 last:mb-0 relative"
    >
      <div className="flex items-center justify-between">
        <p className="">{job.user?.name}</p>

        <p className="flex md:hidden items-center">
          <Status active={job.isActive} />
        </p>
      </div>

      <div>
        <p className="flex items-center">{job.positions} vaga(s)</p>
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <SeeJobDetails id={job.id} />
      </div>
    </li>
  );
}
