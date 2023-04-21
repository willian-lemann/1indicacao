import { useJobs } from "../hooks/use-jobs";

import { dayjs } from "@/lib/dayjs";
import { Status } from "./Status";
import { SeeJobDetails } from "./SeeJobDetails";

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
        <li
          key={jobItem.id}
          className="grid grid-cols-6 border p-6 rounded text-primary/90 mb-4 last:mb-0"
        >
          <p className="flex items-center">{jobItem.user?.name}</p>
          <p className="flex items-center pl-4 truncate">{jobItem.positions}</p>
          <p className="flex items-center">{jobItem.salary}</p>
          <p className="flex items-center">
            <Status active={jobItem.isActive} />
          </p>
          <p className="flex items-center">
            {dayjs(jobItem.createdAt).fromNow()}
          </p>

          <div className="flex itemcen justify-center">
            <SeeJobDetails id={jobItem.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
