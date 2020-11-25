import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

export type WrapperVariant = "small" | "regular";
interface LayoutProps {
  variant?: WrapperVariant;
}
export const Layout: React.FC<LayoutProps> = ({
  variant = "regular",
  children,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
