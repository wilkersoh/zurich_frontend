import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <section className="mt-[66px]">{children}</section>;
};
