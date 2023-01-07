import { QuestionData } from "./questionsData";
import { Link } from "react-router-dom";

interface Props {
    data: QuestionData;
    showContent?: boolean;
}

export const Question = ({ data, showContent = true }: Props) => (
    <div className="mt-3">
        <Link
            className="text-dark text-decoration-none fs-3 "
            to={`/question/${data.Id}`}
        >
            {data.title}
        </Link>
        {showContent && (
            <div className="text-secondary fw-lighter">
                {data.content.length > 50
                    ? `${data.content.substring(0, 50)}...`
                    : data.content}
            </div>
        )}
        <div className="text-secondary fw-lighter fst-italic">
            {`Asked by ${
                data.userName
            } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
        </div>
    </div>
);
