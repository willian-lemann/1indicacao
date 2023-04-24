import { Job } from "../types/job";
import { dayjs } from "@/lib/dayjs";
import { Status } from "./Status";
import CustomSwitch from "../Switch";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import EditJob from "../EditJob";
import DeleteJob from "../DeleteJob";

type JobCardProps = {
  job: Job;
};

export function EmployerJobCard({ job }: JobCardProps) {
  const { isCandidate } = useAuth();

  return (
    <li
      key={job.id}
      className="hidden md:grid grid-cols-8 border p-6 rounded text-primary/90 mb-4 last:mb-0"
    >
      <p className="flex items-center pl-4">{job.positions} vaga(s)</p>
      <p className="flex items-center truncate">{job.salary}</p>
      <p className="flex items-center">
        <Status active={job.isActive} />
      </p>
      <p className="flex items-center">{dayjs(job.createdAt).fromNow()}</p>

      <div className="flex items-center justify-center">
        <CustomSwitch jobActive={job.id} isActive={job.isActive} />
      </div>

      <EditJob id={job.id} />

      <DeleteJob id={job.id} />
    </li>
  );
}
