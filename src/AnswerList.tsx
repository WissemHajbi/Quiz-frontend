import { AnswerData } from "./questionsData";
import { Answer } from "./Answer";

interface Props {
    data?: AnswerData[];
}

export const AnswersList = ({ data }: Props) => {
    return (
        <ul>
            {data?.map((answer) => (
                <div>
                    <hr />
                    <li className="p-2" key={answer.Id}>
                        <Answer data={answer} />
                    </li>
                </div>
            ))}
        </ul>
    );
};
