import { Page } from "./Page";
import React from "react";
import { useParams } from "react-router-dom";
import { QuestionData, getQuestion } from "./questionsData";

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
                    <p>{question === null ? "" : question.title}</p>
                    <footer className="blockquote-footer fs-6">
                        {`on ${question?.created.toLocaleDateString()} ${question?.created.toLocaleTimeString()}`}
                    </footer>
                </blockquote>
            </div>
        </div>
    );
};
