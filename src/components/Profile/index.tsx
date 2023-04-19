import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import Image from "next/image";
import { flushSync } from "react-dom";

import { api } from "@/utils/api";
import { addSuccessNotification } from "../Alert";

export function Profile() {
  const { user } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const { mutateAsync } = api.users.update.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(
      { ...data },
      {
        onSuccess: ({ name, description }) => {
          setValue("name", name);
          setValue("description", description);
        },
      }
    );

    addSuccessNotification("Perfil salvo!");
  });

  const placeholder = `Caso você prefira escrever uma breve descrição sobre ${
    user?.role === "candidate" ? "você" : "sua empresa"
  }`;

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("description", user.description);
    }
  }, [setValue, user]);

  console.log("render");
  return (
    <div className="container max-w-2xl">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mt-10 flex items-center">
          <div className="relative h-24 w-24 rounded-full">
            <Image
              src="https://avatars.githubusercontent.com/u/44612750?v=4"
              alt="imagem de perfil"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="pl-4 flex items-center group">
            <p className="text-xl font-semibold cursor-pointer">
              {getValues("name")}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-primary/70">Nome</h2>
          <input
            type="text"
            placeholder="nome"
            className="px-4 py-2 outline-none border border-primary rounded mt-2"
            {...register("name")}
          />
        </div>

        <div className="mt-4 w-full">
          <h2 className="text-primary/70">Breve descrição da empresa</h2>

          <textarea
            id="description"
            className="border  border-primary w-full h-20 p-4 rounded mt-2"
            placeholder={placeholder}
            {...register("description")}
          />
        </div>

        <button className="px-4 py-2 mt-2  bg-primary  text-white rounded cursor-pointer self-end gap-2">
          <span>Salvar</span>
        </button>
      </form>
    </div>
  );
}
