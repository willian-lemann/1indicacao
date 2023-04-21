import { useClerk } from "@clerk/nextjs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export function ExcludeAccount() {
  const {} = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function excludeAccount() {}

  return (
    <>
      <button
        onClick={openModal}
        className="text-primary hover:text-red-600 transition-colors px-4 py-2 rounded"
      >
        Excluir minha conta
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
                <Dialog.Panel className="w-full flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    Tem certeza que deseja excluir sua conta?
                  </Dialog.Title>

                  <div className="mt-4">
                    <h1 className="text-red-600">
                      Isso não podera mais ser desfeito!
                    </h1>
                  </div>

                  <div className="mt-10">
                    <span>Para deletar sua conta, digite seu nome abaixo:</span>
                    <input
                      type="text"
                      className="px-4 py-2 outline-none border border-primary rounded mt-2"
                      placeholder="nome"
                    />
                  </div>

                  <div className="mt-10 self-end">
                    <button
                      className="text-primary px-3 py-1 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 text-white rounded"
                      onClick={() => {}}
                    >
                      Excluir minha conta
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
