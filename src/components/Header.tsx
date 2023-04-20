import Image from "next/image";
import { Tab, Popover } from "@headlessui/react";
import { SignOutButton } from "@clerk/nextjs";

import { useAuth } from "@/features/authentication/hooks/use-auth";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="shadow-md">
      <div className="container flex items-center justify-between py-6 ">
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
          <button
            className="hover:bg-primary/80 hover:text-white w-full px-4 py-1 text-primary rounded transition-colors"
            onClick={() => signOut()}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
