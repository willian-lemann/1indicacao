import { useAuth } from "../authentication/hooks/use-auth";
import { useMyJobs } from "./hooks/use-my-jobs";

import { dayjs } from "@/lib/dayjs";

export function Jobs() {
  const { jobs, isEmpty } = useMyJobs();
  const { user } = useAuth();

  return (
    <div className="container py-4">
      {user?.role === "employer" ? (
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Minhas Vagas</h1>

          <button className="bg-primary px-4 py-2 rounded text-white">
            Cadastrar Vaga
          </button>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-[1fr,1fr,1fr,1fr,1fr] text-primary font-semibold p-6">
        <p>Nome</p>
        <p className="flex items-center">Status</p>
        <p className="flex items-center">N de Vagas</p>
        <p className="flex items-center">Remuneração</p>
        <p className="flex items-center">Postado há</p>
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
            className="grid grid-cols-5 border p-6 rounded text-primary/90"
          >
            <p>{jobItem.user?.name}</p>
            <p>{jobItem.isActive ? "Ativo" : "Fechada"}</p>
            <p>{jobItem.positions}</p>
            <p>{jobItem.salary}</p>
            <p>{dayjs(jobItem.createdAt).fromNow(false)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
