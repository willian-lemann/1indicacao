import { useAuth } from "../authentication/hooks/use-auth";
import { useMyJobs } from "@/features/employers/hooks/use-my-jobs";

import { dayjs } from "@/lib/dayjs";
import AddJob from "./AddJob";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import CustomSwitch from "./Switch";
import EditJob from "./EditJob";

export function Jobs() {
  const { jobs, isEmpty } = useMyJobs();
  const { user } = useAuth();

  const [selectedJobActive] = useState(null);

  return (
    <div className="container py-4">
      {user?.role === "employer" ? (
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Minhas Vagas</h1>

          <AddJob />
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr] text-primary font-semibold p-6">
        <p>Nome</p>
        <p className="flex items-center">N de Vagas</p>
        <p className="flex items-center">Remuneração</p>
        <p className="flex items-center">Status</p>
        <p className="flex items-center">Postado em</p>
        <p className="flex items-center">Mudar status</p>
      </div>

      <ul>
        {isEmpty ? (
          <div className="flex items-center justify-center p-10">
            <h2>Não há vagas cadastradas</h2>
          </div>
        ) : null}
        {jobs.map((jobItem) => (
          <li
            key={jobItem.id}
            className="grid grid-cols-7 border p-6 rounded text-primary/90 mb-4 last:mb-0"
          >
            <p className="flex items-center">{jobItem.user?.name}</p>
            <p className="flex items-center pl-4">{jobItem.positions}</p>
            <p className="flex items-center">{jobItem.salary}</p>
            <p className="flex items-center">
              {jobItem.isActive ? "Ativo" : "Fechada"}
            </p>
            <p className="flex items-center">
              {dayjs(jobItem.createdAt).fromNow(false)}
            </p>

            <div className="flex items-center justify-center">
              <CustomSwitch
                jobActive={jobItem.id}
                isActive={jobItem.isActive}
              />
            </div>

            <EditJob id={jobItem.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
