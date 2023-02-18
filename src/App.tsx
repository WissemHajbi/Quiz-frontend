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
import { SignOutPage } from "./SignOutPage";

const AskPage = React.lazy(() => import("./AskPage"));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
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
                                    <AskPage />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="signin"
                            element={<SignInPage action="signin" />}
                        />
                        <Route
                            path="signin-callback"
                            element={<SignInPage action="signin-callback" />}
                        />
                        <Route
                            path="signout"
                            element={<SignOutPage action="signout" />}
                        />
                        <Route
                            path="signout-callback"
                            element={<SignOutPage action="signout-callback" />}
                        />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="question/:Id" element={<QuestionPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
