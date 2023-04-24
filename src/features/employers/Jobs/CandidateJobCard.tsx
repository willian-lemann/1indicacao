import { Job } from "../types/job";
import { SeeJobDetails } from "./SeeJobDetails";
import { Status } from "./Status";
import { dayjs } from "@/lib/dayjs";

type CandidateJobCardProps = {
  job: Job;
};

export function CandidateJobCard({ job }: CandidateJobCardProps) {
  return (
    <li
      key={job.id}
      className="hidden md:grid grid-cols-6 border p-6 rounded text-primary/90 mb-4 last:mb-0"
    >
      <p className="flex items-center">{job.user?.name}</p>
      <p className="flex items-center pl-4 truncate">{job.positions}</p>
      <p className="flex items-center">{job.salary}</p>
      <p className="flex items-center">
        <Status active={job.isActive} />
      </p>
      <p className="flex items-center">{dayjs(job.createdAt).fromNow()}</p>

      <div className="flex itemcen justify-center">
        <SeeJobDetails id={job.id} />
      </div>
    </li>
  );
}
