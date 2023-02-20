import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Header } from "./Header";
import { SignInPage } from "./SignInPage";
import { SearchPage } from "./SearchPage";
import { QuestionPage } from "./QuestionPage";
import NotFoundPage from "./NotFoundPage";
import { Provider } from "react-redux";
import { store } from "./Store";
import { Auth0Provider } from "@auth0/auth0-react";
import { SignOutPage } from "./SignOutPage";
import { AuthorizedPage } from "./AuthorizedPage";

const AskPage = React.lazy(() => import("./AskPage"));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Auth0Provider
                    domain="dev-fqci1md6b68q36qe.us.auth0.com"
                    clientId="nwNaBnoBhHQzuvYa4QgDCzgRArInbCVE"
                    authorizationParams={{
                        redirect_uri: "http://localhost:3000/signin-callback",
                    }}
                >
                    <div className="container">
                        <Header />
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route
                                path="ask"
                                element={
                                    <React.Suspense
                                        fallback={<div>loading ...</div>}
                                    >
                                        <AuthorizedPage>
                                            <AskPage />
                                        </AuthorizedPage>
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path="/signin"
                                element={<SignInPage action="signin" />}
                            />
                            <Route
                                path="/signin-callback"
                                element={
                                    <SignInPage action="signin-callback" />
                                }
                            />
                            <Route
                                path="/signout"
                                element={<SignOutPage action="signout" />}
                            />
                            <Route
                                path="/signout-callback"
                                element={
                                    <SignOutPage action="signout-callback" />
                                }
                            />
                            <Route path="search" element={<SearchPage />} />
                            <Route
                                path="question/:Id"
                                element={<QuestionPage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </Auth0Provider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
