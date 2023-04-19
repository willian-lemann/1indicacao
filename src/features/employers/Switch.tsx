import { useState } from "react";
import { Switch } from "@headlessui/react";
import { api } from "@/utils/api";

type CustomSwitchProps = {
  jobActive: string;
  isActive: boolean;
};

export default function CustomSwitch({
  jobActive,
  isActive,
}: CustomSwitchProps) {
  const [enabled, setEnabled] = useState(isActive);
  const { mutateAsync } = api.jobs.toggleStatus.useMutation();

  async function handleChangeStatus(checked: boolean) {
    setEnabled(checked);

    console.log({ checked, jobActive });
    try {
      await mutateAsync({ id: jobActive, isActive: checked });
    } catch (error) {
      setEnabled(false);
    }
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChangeStatus}
      className={`${enabled ? "bg-primary" : "bg-primary/50"}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
