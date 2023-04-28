import { classnames } from "@/utils/classnames";
import { CandidateCard } from "./CandidateCard";
import { useCandidates } from "./hooks/use-candidates";

export function Candidates() {
  const { candidates, isEmpty } = useCandidates();

  return (
    <div className="px-8 md:container py-4 z-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg  py-2">Candidatos</h1>
      </div>

      <ul className={classnames(isEmpty ? "md:grid-cols-1" : "md:grid-cols-3" ,"mt-4 grid grid-cols-1 gap-10 mb-10")}>
        {isEmpty ? (
          <div className="flex items-center text-primary/70 justify-center md:p-10">
            <h2>Nenhum candidato cadastrado ainda.</h2>
          </div>
        ) : null}
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </ul>
    </div>
  );
}
