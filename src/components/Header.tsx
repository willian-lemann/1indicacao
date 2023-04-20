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

        <Popover className="relative">
          <Popover.Button>
            <div className="relative h-10 w-10 rounded-full">
              <Image
                src="https://avatars.githubusercontent.com/u/44612750?v=4"
                alt="imagem de perfil"
                className="object-cover rounded-full"
                fill
              />
            </div>
          </Popover.Button>

          <Popover.Panel className="absolute z-[9999] shadow-lg rounded bg-white h-10 w-20 flex flex-col justify-center">
            <button
              className="hover:text-red-800 w-full px-4 py-2 text-primary"
              onClick={() => signOut()}
            >
              Sair
            </button>
          </Popover.Panel>
        </Popover>
      </div>
    </header>
  );
}
