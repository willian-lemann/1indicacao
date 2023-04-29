import { classnames } from "@/utils/classnames";
import { Loading } from "@/components/Loading";

type SaveButtonProps = { loading: boolean };

export function SaveButton({ loading }: SaveButtonProps) {
  return (
    <button
      disabled={loading}
      className={classnames(
        loading ? "opacity-50 cursor-not-allowed" : "opacity-100",
        "px-4 py-2 flex items-center justify-center bg-primary  text-white rounded cursor-pointer gap-2"
      )}
    >
      <span>Salvar</span>

      {loading ? <Loading /> : null}
    </button>
  );
}
