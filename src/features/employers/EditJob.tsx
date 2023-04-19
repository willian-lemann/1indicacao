import { addSuccessNotification } from "@/components/Alert";
import { UpdateJobSchemaData } from "@/server/api/routers/jobs";
import { api } from "@/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useJob } from "./hooks/use-job";

type EditJobProps = { id: string };

export default function EditJob({ id }: EditJobProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<UpdateJobSchemaData>();
  const { job } = useJob({ id });

  const { mutateAsync } = api.jobs.update.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ ...data, positions: String(data.positions), id });
    addSuccessNotification("Vaga alterada com sucesso!");
    setIsOpen(false);
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (job) {
      setValue("position", job.position);
      setValue("salary", job.salary);
      setValue("positions", job.positions);
    }
  }, [job, setValue]);
  return (
    <>
      <button onClick={openModal} className="text-primary px-4 py-2 rounded">
        Editar
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
                  <form onSubmit={onSubmit} className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cadastrar vaga
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <h2 className="opacity-70">Número de vagas</h2>
                        <input
                          type="number"
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                          placeholder="Número de vagas"
                          {...register("positions")}
                        />
                      </div>

                      <div>
                        <h2 className="opacity-70">Remuneração</h2>
                        <input
                          type="text"
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                          placeholder="Remuneração"
                          {...register("salary")}
                        />
                      </div>

                      <div>
                        <h2 className="opacity-70">Descrição da vaga</h2>
                        <textarea
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4 w-full"
                          placeholder="Descrição da vaga"
                          {...register("position")}
                        />
                      </div>
                    </div>

                    <div className="mt-4 self-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
