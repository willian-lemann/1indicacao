import { Loading } from "@/components/Loading";
import { api } from "@/utils/api";
import { classnames } from "@/utils/classnames";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const { mutateAsync, isLoading } = api.users.create.useMutation();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [nextStep, setNextStep] = useState(false);

  function handleChooseRole(role: string) {
    setRole(role);
  }

  function handleNext() {
    setNextStep(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await mutateAsync({ role, name });

    if (role === "candidate") {
      router.push("/candidato");
    } else {
      router.push("/empresa");
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-center list-none">
      <h1 className="text-lg">Selecione a opção que você se enquadra:</h1>
      {nextStep ? (
        <div>
          <input
            type="text"
            placeholder="seu nome"
            className="px-4 py-2 outline-none border rounded"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 text-zinc-700">
          <li
            onClick={() => handleChooseRole("employer")}
            className={classnames(
              role === "employer" ? "outline outline-primary" : "",
              "border shadow-md p-24 rounded cursor-pointer hover:outline hover:outline-primary transition-all"
            )}
          >
            <h2> Eu sou empresa e quero contratar </h2>
          </li>

          <li
            onClick={() => handleChooseRole("candidate")}
            className={classnames(
              role === "candidate" ? "outline outline-zinc-600" : "",
              "border shadow-md p-24 rounded cursor-pointer hover:outline hover:outline-primary transition-all"
            )}
          >
            <h2> Eu sou candidato e quero emprego </h2>
          </li>
        </div>
      )}

      {nextStep ? (
        <button
          type="submit"
          onClick={handleSubmit}
          className={classnames(
            role ? "bg-primary" : "bg-indigo-600/20",
            "px-4 py-2 rounded text-white hover:brightness-95 transition-all"
          )}
        >
          {isLoading ? <Loading /> : "Entrar"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className={classnames(
            role ? "bg-primary" : "bg-indigo-600/20",
            "px-4 py-2 rounded text-white hover:brightness-95 transition-all"
          )}
        >
          Prosseguir
        </button>
      )}
    </main>
  );
}
