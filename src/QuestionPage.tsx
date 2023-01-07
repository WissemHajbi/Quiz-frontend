import { Page } from "./Page";
import React from "react";
import { useParams } from "react-router-dom";
import { QuestionData, getQuestion } from "./questionsData";
import { AnswersList } from "./AnswerList";

export const QuestionPage = () => {
    const [question, setQuestion] = React.useState<QuestionData | null>(null);
    const { Id } = useParams();

    React.useEffect(() => {
        const doGetQuestion = async (Id: number) => {
            const foundQuestion = await getQuestion(Id);
            setQuestion(foundQuestion);
        };
        if (Id) {
            doGetQuestion(Number(Id));
        }
    }, [Id]);

    return (
        <div className="card m-5">
            <div className="card-header">
                {question === null ? "" : question.userName}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p className="fw-bold ms-4 fs-3">
                        {question === null ? "" : question.title}
                    </p>
                    <p className="ms-4 text-dark">
                        {question === null ? "" : question.content}
                    </p>
                    <footer className="blockquote-footer fs-6 ms-4 fw-lighter fst-italic">
                        {`on ${question?.created.toLocaleDateString()} ${question?.created.toLocaleTimeString()}`}
                    </footer>
                    <AnswersList
                        data={question === null ? undefined : question.answers}
                    />
                </blockquote>
            </div>
        </div>
    );
};
