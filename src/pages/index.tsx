import { api } from "@/utils/api";
import { classnames } from "@/utils/classnames";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const { mutateAsync } = api.users.create.useMutation();

  const router = useRouter();
  const [role, setRole] = useState("");

  function handleChooseRole(role: string) {
    setRole(role);
  }

  async function handleSubmit() {
    await mutateAsync({ role });

    if (role === "candidate") {
      router.push("/candidato");
    } else {
      router.push("/empresa");
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-center list-none">
      <h1 className="text-lg">Selecione a opção que você se enquadra:</h1>
      <div className="flex items-center gap-4 text-zinc-700">
        <li
          onClick={() => handleChooseRole("candidate")}
          className={classnames(
            role === "candidate" ? "outline outline-primary" : "",
            "border shadow-md p-24 rounded cursor-pointer hover:outline hover:outline-primary transition-all"
          )}
        >
          <h2> Eu sou empresa e quero contratar </h2>
        </li>

        <li
          onClick={() => handleChooseRole("employer")}
          className={classnames(
            role === "employer" ? "outline outline-zinc-600" : "",
            "border shadow-md p-24 rounded cursor-pointer hover:outline hover:outline-primary transition-all"
          )}
        >
          <h2> Eu sou candidato e quero emprego </h2>
        </li>
      </div>

      <button
        onClick={handleSubmit}
        className={classnames(
          role ? "bg-primary" : "bg-indigo-600/20",
          "px-4 py-2 rounded text-white hover:brightness-95 transition-all"
        )}
      >
        Prosseguir
      </button>
    </main>
  );
}
