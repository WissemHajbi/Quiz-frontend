import { QuestionData } from "./questionsData";
import { Link } from "react-router-dom";

interface Props {
    data: QuestionData;
    showContent?: boolean;
}

export const Question = ({ data, showContent }: Props) => (
    <div>
        <Link to={`/question/${data.Id}`}>{data.title}</Link>
        {showContent && (
            <div>
                {data.content.length > 50
                    ? `${data.content.substring(0, 50)}...`
                    : data.content}
            </div>
        )}
        <div>
            {`Asked by ${
                data.userName
            } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
        </div>
    </div>
);
