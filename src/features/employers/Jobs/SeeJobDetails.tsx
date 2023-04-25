import { Loading } from "@/components/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useJob } from "../hooks/use-job";

type SeeJobDetailsProps = {
  id: string;
};

export function SeeJobDetails({ id }: SeeJobDetailsProps) {
  const { job, isLoading } = useJob({ id });

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 md:rounded rounded-full text-white bg-primary md:bg-transparent md:text-primary"
      >
        Ver vaga
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex items-center justify-between">
                    Detalhes da vaga
                    <XMarkIcon
                      className="h-6 w-6 text-primary cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>

                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <h1 className="font-bold">{job?.position || ""}</h1>

                      <p className="pt-2">{job?.description || ""}</p>

                      <p className="py-4">Salário {job?.salary || ""}</p>

                      <div className="mt-4">
                        <strong>Contatos:</strong>
                        <p>{job?.user?.instagram}</p>

                        <div className="flex items-center gap-4">
                          <p>{job?.user?.phone}</p>

                          {job?.user?.phone ? (
                            <div className="relative h-6 w-6">
                              <Image
                                src="/whatsapp.svg"
                                alt="whatsapp icon"
                                className="object-cover text-[0]"
                                fill
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
