import React from "react";
import { PageTitle } from "./PageTitle";
interface props {
    title?: string;
    children: React.ReactNode;
}

export const Page = ({ title, children }: props) => (
    <div>
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>
);
