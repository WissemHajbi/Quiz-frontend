import React from "react";
import { QuestionList } from "./QuestionList";
import { getUnansweredQuestions, QuestionData } from "./questionsData";
import { PageTitle } from "./PageTitle";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [questions, setQuestions] = React.useState<QuestionData[]>([]);
    const [questionsLoading, setQuestionsLoading] = React.useState(true);

    React.useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            const unansweredQuestions = await getUnansweredQuestions();
            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnansweredQuestions();
    }, []);

    const navigate = useNavigate();

    const handleAskQuestionClick = () => {
        navigate("ask");
    };

    return (
        <div>
            <PageTitle>Unanswered Questions</PageTitle>
            <div>
                <div>
                    <button
                        onClick={handleAskQuestionClick}
                        className="btn btn-primary m-3"
                    >
                        Ask a question
                    </button>
                </div>
                {questionsLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <QuestionList data={questions || []} />
                )}
            </div>
        </div>
    );
};
