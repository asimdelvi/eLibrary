import React from "react";
import type { FormProps } from "../types";

export const Form: React.FC<FormProps> = ({
  title,
  formSubmitFunction,
  children,
}) => {
  return (
    <form
      onSubmit={formSubmitFunction}
      className="flex p-5 bg-white min-h-[50%] flex-col max-width-[10rem] justify-around items-center border-[2px] border-black rounded-3xl form"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {children}
    </form>
  );
};
