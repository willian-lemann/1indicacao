import { useMyJobs } from "./hooks/use-my-jobs";

export function MyJobs() {
  const { jobs, isEmpty } = useMyJobs();

  return (
    <div className="container py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg">Minhas Vagas</h1>

        <button className="bg-primary px-4 py-2 rounded text-white">
          Cadastrar Vaga
        </button>
      </div>

      <div className="mt-4 grid grid-cols-[1fr,1fr,1fr,1fr,1fr] text-primary font-semibold">
        <p>Nome</p>
        <p className="flex items-center justify-end">Status</p>
        <p className="flex items-center justify-end">N de Vagas</p>
        <p className="flex items-center justify-end">Remuneração</p>
        <p className="flex items-center justify-end">Postado há</p>
      </div>

      <ul>
        {isEmpty ? (
          <div className="flex items-center justify-center p-10">
            <h2>Não há vagas cadastradas</h2>
          </div>
        ) : null}
        {jobs.map((jobItem) => (
          <li key={jobItem.id}>
            <strong>{jobItem.user?.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
