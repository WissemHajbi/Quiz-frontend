import React from "react";
import { QuestionList } from "./QuestionList";
import {
    getAllQuestions,
    getUnansweredQuestions,
    QuestionData,
} from "./questionsData";
import { PageTitle } from "./PageTitle";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    gettingUnansweredQuestionsAction,
    gotUnansweredQuestionsAction,
    AppState,
} from "./Store";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
    const { isAuthenticated } = useAuth0();
    const questions = useSelector(
        (state: AppState) => state.questions.unanswered
    );
    const questionsLoading = useSelector(
        (state: AppState) => state.questions.loading
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            dispatch(gettingUnansweredQuestionsAction());
            const unansweredQuestions = await getUnansweredQuestions();
            dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
        };
        doGetUnansweredQuestions();

        // next comment is to disable the warning from Eslint =>
        // eslint-disable-next-line
    }, []);

    const navigate = useNavigate();

    const handleAskQuestionClick = () => {
        navigate("ask");
    };

    return (
        <div>
            <PageTitle>Unanswered Questions</PageTitle>
            <div>
                {isAuthenticated && (
                    <div>
                        <button
                            onClick={handleAskQuestionClick}
                            className="btn btn-primary m-3"
                        >
                            Ask a question
                        </button>
                    </div>
                )}
                {questionsLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <QuestionList data={questions || []} />
                )}
            </div>
        </div>
    );
};
