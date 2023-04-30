import { User } from "@/features/authentication/types/user";
import { SeeDetails } from "@/features/candidates/SeeDetails";
import { classnames } from "@/utils/classnames";
import Image from "next/image";

type CompanyProps = {
  company: User;
};

export function Company({ company }: CompanyProps) {
  return (
    <li className="border p-6 animate-fadeIn rounded text-primary/90 flex relative max-h-60">
      <div className={classnames(company.avatar ? "flex-1" : "")}>
        {company.avatar ? (
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
            {company.name}
            <span className="font-normal text-zinc-600 pl-2">
              {company.position}
            </span>
          </strong>
          <p className="text-zinc-700">{company.instagram}</p>
          <p className="text-zinc-700">{company.phone}</p>
        </div>

        <p className="line-clamp-3">{company.description}</p>
      </div>

      <SeeDetails
        name={String(company.name)}
        description={String(company.description)}
      />
    </li>
  );
}
