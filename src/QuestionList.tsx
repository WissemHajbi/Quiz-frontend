import React from "react";
import { QuestionData } from "./questionsData";
import { Question } from "./Question";

interface Props {
    data?: QuestionData[];
    renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (
    <ul className="m-3">
        {data?.map((question) => (
            <li key={question.Id}>
                {renderItem ? (
                    renderItem(question)
                ) : (
                    <Question data={question} />
                )}
            </li>
        ))}
    </ul>
);
