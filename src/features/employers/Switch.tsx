import { useState } from "react";
import { Switch } from "@headlessui/react";
import { api } from "@/utils/api";
import { useJobs } from "./hooks/use-jobs";

type CustomSwitchProps = {
  jobActive: string;
  isActive: boolean;
};

export default function CustomSwitch({
  jobActive,
  isActive,
}: CustomSwitchProps) {
  const { toggleStatus } = useJobs();

  const { mutateAsync } = api.jobs.toggleStatus.useMutation();

  async function handleChangeStatus(checked: boolean) {
    toggleStatus(jobActive, checked);

    try {
      await mutateAsync({ id: jobActive, isActive: checked });
    } catch (error) {
      toggleStatus(jobActive, !checked);
    }
  }

  return (
    <Switch
      checked={isActive}
      onChange={handleChangeStatus}
      className={`${isActive ? "bg-green-600" : "bg-primary"}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        aria-hidden="true"
        className={`${isActive ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
