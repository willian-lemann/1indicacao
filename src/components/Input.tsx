import { classnames } from "@/utils/classnames";
import { HTMLAttributes, PropsWithChildren } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  type?: string;
  register: any;
};

const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {children}
    </label>
  );
};

export function Input({
  children,
  register,
  className,
  ...props
}: PropsWithChildren<InputProps>) {
  return (
    <div className="space-y-1">
      {children}

      <div className="relative rounded-md shadow-sm">
        <input
          {...props}
          className={classnames(
            String(className),
            "rounded-md border-0 outline-none py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          )}
          {...register}
        />
      </div>
    </div>
  );
}

Input.Label = Label;
