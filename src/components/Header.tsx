import Image from "next/image";
import { Tab } from "@headlessui/react";

import { useAuth } from "@/features/authentication/hooks/use-auth";
import { classnames } from "@/utils/classnames";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReactSelect from "react-select";
import { LocationSelect } from "@/features/locations/LocationSelect";
import { LocationOption } from "@/features/locations/types/location-option";
import { Logo } from "./Logo";

export type Permissions = {
  isCandidate: boolean;
  isEmployer: boolean;
};

type HeaderProps = {
  permissions: Permissions;
  locations: LocationOption[];
};

export function Header({ permissions, locations }: HeaderProps) {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="shadow-md">
      <div className="px-8 md:container md:px-20 flex items-center justify-between py-6">
        <Logo />

        <div className="md:hidden flex relative h-10 w-10">
          <Bars3Icon className="h-10 w-10" onClick={openMenu} />
        </div>

        <Tab.List
          onClick={closeMenu}
          className={classnames(
            isOpen ? "-translate-x-0" : "-translate-x-full md:translate-x-0",
            "transition-all space-y-6 md:space-y-0 z-10 flex pt-20 md:pt-0 flex-col md:flex-row items-start md:items-center shadow-lg md:shadow-none md:relative absolute bottom-0 bg-white px-8 md:w-auto w-[230px] py-10 md:py-0 md:gap-4 top-0 left-0"
          )}
        >
          <div className="flex items-center">
            <div className="md:hidden w-10 h-10 absolute top-6">
              <Image src="/icon.svg" alt="logo" fill />
            </div>

            <XMarkIcon
              className="h-8 w-8 absolute md:hidden top-7 right-4 text-[0rem]"
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

          {permissions.isCandidate ? (
            <>
              <Tab className="outline-none">
                {({ selected }) => (
                  <button
                    className={classnames(
                      selected ? "border-b-2 border-primary" : "",
                      "py-1"
                    )}
                  >
                    Empresas
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
                    Vagas
                  </button>
                )}
              </Tab>
            </>
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
        </Tab.List>

        <LocationSelect locations={locations} />

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
