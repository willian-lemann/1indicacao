import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { User } from "../authentication/types/user";
import { SeeDetails } from "./SeeDetails";

type CandidateCard = {
  candidate: User;
};

export function CandidateCard({ candidate }: CandidateCard) {
  return (
    <li
      key={candidate.id}
      className="border p-6 rounded text-primary/90 flex relative max-h-60"
    >
      <div className={classnames(candidate.avatar ? "flex-1" : "")}>
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

      <SeeDetails name={candidate.name} description={candidate.description} />
    </li>
  );
}
