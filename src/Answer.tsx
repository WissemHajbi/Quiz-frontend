import { AnswerData } from "./questionsData";

interface Props {
    data: AnswerData;
}

export const Answer = ({ data }: Props) => {
    return (
        <div>
            <div>{data.content}</div>
            <div className="text-secondary fs-6 fw-lighter fst-italic">{`Answered by ${
                data.userName
            } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}</div>
        </div>
    );
};
