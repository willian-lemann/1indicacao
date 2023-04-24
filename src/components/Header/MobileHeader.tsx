import { useAuth } from "@/features/authentication/hooks/use-auth";
import { classnames } from "@/utils/classnames";
import { Tab } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

export function MobileHeader() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="md:hidden flex shadow-md h-fit">
      <div className="px-8 flex items-center justify-between py-6">
        <Bars3Icon className="h-10 w-10" onClick={openMenu} />

        <div className="relative w-10 h-10">
          <Image src="/icon.svg" alt="logo" fill />
        </div>

        <Tab.List
          onClick={closeMenu}
          className={classnames(
            isOpen ? "-translate-x-0" : "-translate-x-full",
            "transition-all space-y-6 z-50 flex pt-20 flex-col items-start shadow-lg absolute bottom-0 bg-white px-8 w-[230px] py-10 top-0 left-0"
          )}
        >
          <div>
            <div className="h-10 w-10 absolute top-4">
              <Image src="/icon.svg" fill alt="logo" />
            </div>

            <XMarkIcon
              className="h-8 w-8 absolute  top-4 right-4"
              onClick={closeMenu}
            />
          </div>

          <Tab className="outline-none">
            {({ selected }) => (
              <button
                className={classnames(
                  selected ? "border-b-2 border-primary" : "",
                  "py-1"
                )}
              >
                Meu perfil
              </button>
            )}
          </Tab>

          {user?.role === "candidate" ? (
            <Tab className="outline-none">
              {({ selected }) => (
                <button
                  className={classnames(
                    selected ? "border-b-2 border-primary" : "",
                    "py-1"
                  )}
                >
                  Vagas
                </button>
              )}
            </Tab>
          ) : (
            <>
              <Tab className="outline-none">
                {({ selected }) => (
                  <button
                    className={classnames(
                      selected ? "border-b-2 border-primary" : "",
                      "py-1"
                    )}
                  >
                    Candidatos
                  </button>
                )}
              </Tab>

              <Tab className="outline-none">
                {({ selected }) => (
                  <button
                    className={classnames(
                      selected ? "border-b-2 border-primary" : "",
                      "py-1"
                    )}
                  >
                    Minhas Vagas
                  </button>
                )}
              </Tab>
            </>
          )}

          <div>
            <button
              className="hover:bg-primary/80 hover:text-white w-full text-primary rounded transition-colors"
              onClick={() => signOut()}
            >
              Sair
            </button>
          </div>
        </Tab.List>
      </div>
    </header>
  );
}
