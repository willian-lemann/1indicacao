import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col pt-20 md:pb-8 space-y-10">
      <div className="flex flex-col md:flex-row items-start pl-8 gap-8">
        <div>
          <strong className="text-lg">Páginas</strong>
          <ul>
            <Link href="/sobre">Sobre</Link>
          </ul>
        </div>

        <div>
          <strong className="text-lg">Contato</strong>
          <p>umaindicacao@gmail.com</p>
        </div>
      </div>

      <div className="px-8  py-4">
        <p>Copyright © 2023 1indicação.com.br.</p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
