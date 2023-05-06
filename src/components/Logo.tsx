import Image from "next/image";

export function Logo() {
  return (
    <div className="hidden md:flex relative h-10 w-10">
      <Image src="/icon.svg" alt="icone" fill />
    </div>
  );
}
