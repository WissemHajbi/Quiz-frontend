import { Page } from "./Page";
import { useAuth0 } from "@auth0/auth0-react";

type SigninAction = "signin" | "signin-callback";

interface Props {
    action: SigninAction;
}

export const SignInPage = ({ action }: Props) => {
    const { loginWithRedirect } = useAuth0();
    if (action === "signin") {
        loginWithRedirect();
    }
    return (
        <Page title="Sign In">
            <p>Signing in ...</p>
        </Page>
    );
};

// TODO : make this the profile page display
