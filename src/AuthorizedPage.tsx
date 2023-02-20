import { useAuth0 } from "@auth0/auth0-react";
import { Page } from "./Page";

type Props = {
    children: React.ReactNode;
};

export const AuthorizedPage = (prop: Props) => {
    const { isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return <>{prop.children}</>;
    } else {
        return <Page title="you are not authenticated yet :p">{null}</Page>;
    }
};
