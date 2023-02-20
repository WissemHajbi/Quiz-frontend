import { Page } from "./Page";
import { useAuth0 } from "@auth0/auth0-react";

type SignoutAction = "signout" | "signout-callback";

interface Props {
    action: SignoutAction;
}

export const SignOutPage = ({ action }: Props) => {
    let message = "Signing out ...";

    const { logout } = useAuth0();

    switch (action) {
        case "signout":
            logout({
                clientId: "nwNaBnoBhHQzuvYa4QgDCzgRArInbCVE",
                logoutParams: {
                    logoutParams: {
                        returnTo: "http://localhost:3000/signout-callback",
                    },
                },
            });
            break;
        case "signout-callback":
            message = "You successfully signed out!";
            break;
    }

    return (
        <Page title="Sign out">
            <p>{message}</p>
        </Page>
    );
};
