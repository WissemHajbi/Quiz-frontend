import React from "react";
interface props {
    children: React.ReactNode;
}

export const PageTitle = ({ children }: props) => <h2>{children}</h2>;
