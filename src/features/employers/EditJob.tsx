import { addSuccessNotification } from "@/components/Alert";
import { Input } from "@/components/Input";
import { SaveButton } from "@/components/SaveButton";
import { Textarea } from "@/components/Textarea";
import { UpdateJobSchemaData } from "@/server/api/routers/jobs";
import { api } from "@/utils/api";
import { classnames } from "@/utils/classnames";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useJob } from "./hooks/use-job";
import { useJobs } from "./hooks/use-jobs";

type EditJobProps = { id: string };

export default function EditJob({ id }: EditJobProps) {
  const { job } = useJob({ id });
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<UpdateJobSchemaData>({
    values: {
      id,
      position: job?.position || "",
      positions: job?.positions || 0,
      salary: job?.salary || "",
      description: job?.description || "",
    },
  });
  const { updateJob } = useJobs();

  const { mutateAsync, isLoading } = api.jobs.update.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    const updateData = { ...data, positions: String(data.positions), id };

    updateJob(id, data);

    await mutateAsync(updateData);
    addSuccessNotification("Vaga alterada com sucesso!");
    setIsOpen(false);
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                <Dialog.Panel className="w-full max-w-md md:max-w-2xl transform h-[700px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={onSubmit} className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cadastrar vaga
                    </Dialog.Title>
                    <div className="mt-2">
                      <Input
                        type="number"
                        className={classnames(
                          "px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                        )}
                        placeholder="Número de vagas"
                        register={register("positions")}
                      >
                        <Input.Label>Número de vagas</Input.Label>
                      </Input>

                      <Input
                        type="text"
                        className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                        placeholder="Remuneração"
                        register={register("salary")}
                      >
                        <Input.Label>Remuneração</Input.Label>
                      </Input>

                      <Textarea
                        className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4 w-full"
                        placeholder="Descrição da vaga"
                        register={register("position")}
                      >
                        <Textarea.Label>Cargo ou função</Textarea.Label>
                      </Textarea>

                      <Textarea
                        className="px-4 py-2 outline-none border h-40 border-primary rounded border-opacity-50 mb-4 w-full"
                        placeholder="Descrição da vaga"
                        register={register("description")}
                      >
                        <Textarea.Label>Descrição da vaga</Textarea.Label>
                      </Textarea>
                    </div>

                    <div className="mt-4 self-end">
                      <SaveButton loading={isLoading} />
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
