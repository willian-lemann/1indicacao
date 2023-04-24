import { Job } from "../types/job";
import { dayjs } from "@/lib/dayjs";

import CustomSwitch from "../Switch";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import EditJob from "../EditJob";
import DeleteJob from "../DeleteJob";
import { Status } from "../Jobs/Status";

type MobileJobCardProps = {
  job: Job;
};

export function MobileEmployerJobCard({ job }: MobileJobCardProps) {
  const { isCandidate } = useAuth();

  return (
    <li
      key={job.id}
      className="flex justify-between md:hidden border py-10 px-6  md:p-6 rounded text-primary/90 mb-4 last:mb-0 relative"
    >
      <p className="flex md:hidden items-center mt-4">{job.position}</p>

      <p className="flex items-center pl-4 absolute top-4 left-2">
        {job.positions} vaga(s)
      </p>

      <div className="flex items-center justify-center absolute md:relative right-4 top-4">
        <p className="flex md:hidden items-center mr-4">
          <Status active={job.isActive} />
        </p>

        <CustomSwitch jobActive={job.id} isActive={job.isActive} />
      </div>

      <div className="md:hidden self-end mt-4">
        <EditJob id={job.id} />

        <DeleteJob id={job.id} />
      </div>
    </li>
  );
}
