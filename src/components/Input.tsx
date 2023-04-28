import { HTMLAttributes, PropsWithChildren } from "react";

type InputProps = HTMLAttributes<HTMLInputElement>;

const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {children}
    </label>
  );
};

export function Input({ children, ...props }: PropsWithChildren<InputProps>) {
  return (
    <div>
      {children}

      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...props}
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

Input.Label = Label;
