import Image from "next/image";
import { Status } from "../employers/Jobs/Status";
import { useCandidates } from "./hooks/use-candidates";
import { SeeDetails } from "./SeeDetails";

export function Candidates() {
  const { candidates, isEmpty } = useCandidates();

  return (
    <div className="container py-4 z-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg  py-2">Candidatos</h1>
      </div>

      <ul className="mt-4 grid grid-cols-3">
        {isEmpty ? (
          <div className="flex items-center justify-center p-10">
            <h2>Nenhum candidato cadastrado ainda.</h2>
          </div>
        ) : null}
        {candidates.map((candidate) => (
          <li
            key={candidate.id}
            className="border p-6 rounded text-primary/90 flex relative"
          >
            <div className="flex-1">
              {candidate.avatar ? (
                <div className="relative w-10 h-10 rounded-full">
                  <Image
                    src={"https://avatars.githubusercontent.com/u/44612750?v=4"}
                    alt="foto de perfil"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : null}
            </div>

            <div className="pl-4">
              <div className="flex flex-col gap-1">
                <strong>
                  {candidate.name}
                  <span className="font-normal text-zinc-600 pl-2">
                    {candidate.position}
                  </span>
                </strong>
                <p className="text-zinc-700">{candidate.instagram}</p>
                <p className="text-zinc-700">{candidate.phone}</p>
              </div>

              <p className="line-clamp-3">{candidate.description}</p>
            </div>

            <SeeDetails
              name={String(candidate.name)}
              description={String(candidate.description)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
