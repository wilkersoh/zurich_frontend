import React from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Spinner = ({ className, ...otherProps }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        "animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent",
        className
      )}
      {...otherProps}
    ></div>
  );
};
