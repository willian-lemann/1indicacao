import { Logo } from "@/components/Logo";
import Link from "next/link";
import { useAuth } from "../authentication/hooks/use-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export function Header() {
  const { isSignedIn, isEmployer } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  function toggleMenu() {
    setIsMenuOpen((state) => !state);
  }

  function handleLogin() {
    if (isSignedIn) {
      if (isEmployer) {
        return router.push("/empresa");
      }

      return router.push("/candidato");
    }

    return router.push("/login");
  }

  return (
    <header>
      <div className="hidden px-[11rem] md:flex items-center justify-between md:py-4 border-b">
        <Logo />

        <nav className="space-x-4">
          <Link href="/sobre">Sobre</Link>
          <a href="#solution">Nossa Solução</a>
        </nav>
        <button
          onClick={handleLogin}
          className="text-primary hover:text-white px-4 py-1 rounded hover:bg-primary transition"
        >
          {isSignedIn ? "Entrar" : "Login"}
        </button>
      </div>

      {/* mobile */}
      <div
        className={classnames(
          isMenuOpen ? "-translate-x-0" : "-translate-x-full",
          "md:hidden z-50 py-8 bg-white shadow-xl h-full absolute w-[300px] transition-all"
        )}
      >
        <div className="flex flex-col w-full px-4 py-0 gap-4">
          <div className="flex items-center justify-between">
            <Logo />
            <XMarkIcon
              onClick={toggleMenu}
              className="h-10 w-10 text-black/80 cursor-pointer"
            />
          </div>

          <nav className="space-y-2 flex flex-col">
            <Link href="/sobre">Sobre</Link>
            <a href="#solution">Nossa Solução</a>
          </nav>

          <button
            onClick={handleLogin}
            className="w-full text-white hover:brightness-90 px-4 py-1 rounded cursor-pointer bg-primary transition"
          >
            {isSignedIn ? "Entrar" : "Login"}
          </button>
        </div>
      </div>

      <div className="md:hidden p-8 z-0 flex items-center justify-between">
        <Bars3Icon onClick={toggleMenu} className="h-10 w-10" />
        <button
          onClick={handleLogin}
          className="text-primary hover:text-white px-4 py-1 rounded hover:bg-primary transition"
        >
          {isSignedIn ? "Entrar" : "Login"}
        </button>
      </div>
    </header>
  );
}
