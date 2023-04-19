import Image from "next/image";
import { Tab } from "@headlessui/react";

import { useAuth } from "@/features/authentication/hooks/use-auth";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="shadow-md">
      <div className="container flex items-center justify-between py-6">
        <div className="relative h-10 w-10">
          <Image src="/icon.svg" alt="icone" fill />
        </div>

        <Tab.List className="space-x-4 flex items-center">
          <Tab className="outline-none">Meu Perfil</Tab>

          {user?.role === "candidate" ? (
            <Tab className="outline-none">Vagas</Tab>
          ) : (
            <>
              <Tab className="outline-none">Candidatos</Tab>
              <Tab className="outline-none">Minhas Vagas</Tab>
            </>
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
      </div>
    </header>
  );
}
