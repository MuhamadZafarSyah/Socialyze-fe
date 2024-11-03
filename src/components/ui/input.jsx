/* eslint-disable react/prop-types */
import React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef((props, ref) => {
  const { className, name, type, ...rest } = props;

  return (
    <input
      name={name}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-main selection:text-black border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Input.displayName = "Input";