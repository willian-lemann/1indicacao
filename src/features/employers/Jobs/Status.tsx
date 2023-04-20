type StatusProps = { active: boolean };

export function Status({ active }: StatusProps) {
  if (active) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 bg-green-600 rounded-full" />
        <span className="text-green-600">Ativo</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 bg-primary/70 rounded-full" />
      <span className="text-primary/70">Fechada</span>
    </div>
  );
}
