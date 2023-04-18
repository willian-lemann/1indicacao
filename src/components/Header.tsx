import Image from "next/image";
import Link from "next/link";

import { Tab } from "@headlessui/react";

export function Header() {
  const role: "employer" | "candidate" = "candidate";

  return (
    <header className="container flex items-center justify-between py-8">
      <div>logo</div>

      <Tab.List className="space-x-4">
        <Tab className="outline-none">Meu Perfil</Tab>

        {role === "candidate" ? (
          <Tab className="outline-none">Vagas</Tab>
        ) : (
          <Tab className="outline-none">Candidatos</Tab>
        )}
      </Tab.List>

      <div>
        <div className="relative h-10 w-10 rounded-full">
          <Image
            src="https://avatars.githubusercontent.com/u/44612750?v=4"
            alt="imagem de perfil"
            className="object-cover rounded-full"
            fill
          />
        </div>
      </div>
    </header>
  );
}
