import { useForm } from "react-hook-form";
import { useAuth } from "@/features/authentication/hooks/use-auth";

import { api } from "@/utils/api";
import { addSuccessNotification } from "../Alert";
import { UpdateUserSchemaData } from "@/server/api/routers/users";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

export function Profile() {
  const { user, isCandidate } = useAuth();
  const { register, handleSubmit } = useForm<UpdateUserSchemaData>({
    values: {
      name: user?.name || "",
      position: user?.position || "",
      description: user?.description || "",
      instagram: user?.instagram || "",
      phone: user?.phone || "",
    },
  });

  const { mutateAsync } = api.users.update.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ ...data });
    addSuccessNotification("Perfil salvo!");
  });

  const placeholder = ` ${
    isCandidate
      ? 'Exemplo. "Olá, meu nome é [seu nome]. Estou animado para me candidatar a esta vaga de emprego administrativo e contribuir com minhas habilidades. Tenho [X] anos de experiência em cargos administrativos e sou altamente organizado e capaz de gerenciar múltiplas tarefas simultaneamente. Minhas habilidades incluem [lista de habilidades relevantes]. Estou animado para falar mais sobre minhas qualificações e contribuições para esta posição em uma entrevista. Obrigado pela consideração."'
      : "Caso você prefira escrever uma breve descrição sobre sua empresa"
  }`;

  return (
    <div className="px-8 md:px-0 md:mx-auto md:max-w-4xl">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mt-10 flex justify-end">
          <button className="px-4 py-2 bg-primary  text-white rounded cursor-pointer gap-2">
            <span>Salvar</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start w-full justify-between">
          <Input
            placeholder={isCandidate ? "Nome" : "Nome da empresa"}
            {...register("name")}
          >
            <Input.Label>
              {isCandidate ? "Nome" : "Nome da empresa"}
            </Input.Label>
          </Input>

          {isCandidate ? (
            <Input placeholder="seu cargo" {...register("position")}>
              <Input.Label>Seu cargo</Input.Label>
            </Input>
          ) : null}
        </div>

        <div className="flex mt-4  flex-col md:flex-row items-start w-full justify-between">
          <Input
            placeholder="whatsapp"
            className="px-4 py-2 outline-none border border-primary rounded mt-2"
            {...register("phone")}
          >
            <Input.Label>WhatsApp (opcional)</Input.Label>
          </Input>

          <Input
            placeholder="link do instagram"
            className="px-4 py-2 outline-none w-full border border-primary rounded mt-2"
            {...register("instagram")}
          >
            <Input.Label>Instagram (opcional)</Input.Label>
          </Input>
        </div>

        <Textarea
          id="description"
          placeholder={placeholder}
          {...register("description")}
        >
          <Textarea.Label>
            {isCandidate
              ? "Fale um pouco sobre suas experiencias:"
              : "Breve descrição da empresa"}
          </Textarea.Label>
        </Textarea>
      </form>

      {/* <div className="my-10 flex items-center justify-center w-full">
        <ExcludeAccount />
      </div> */}
    </div>
  );
}
