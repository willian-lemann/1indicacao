import { HTMLAttributes, PropsWithChildren } from "react";

type TextareaProps = HTMLAttributes<HTMLTextAreaElement>;

const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className=" text-sm font-medium leading-6 text-gray-900">
      {children}
    </label>
  );
};

export function Textarea({
  children,
  ...props
}: PropsWithChildren<TextareaProps>) {
  return (
    <div className="my-4  w-full">
      {children}

      <textarea
        {...props}
        className="mt-1 w-full h-[300px] rounded-md border-0 py-3 pl-4 text-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
      />
    </div>
  );
}

Textarea.Label = Label;
