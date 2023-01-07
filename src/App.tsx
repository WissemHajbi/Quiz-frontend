import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Header } from "./Header";
import { SignInPage } from "./SignInPage";
import { SearchPage } from "./SearchPage";
import { QuestionPage } from "./QuestionPage";
import NotFoundPage from "./NotFoundPage";

const AskPage = React.lazy(() => import("./AskPage"));

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route
                        path="ask"
                        element={
                            <React.Suspense fallback={<div>loading ...</div>}>
                                <AskPage />
                            </React.Suspense>
                        }
                    />
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="question/:Id" element={<QuestionPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
