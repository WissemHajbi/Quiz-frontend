import { Page } from "./Page";
import React from "react";
import { useParams } from "react-router-dom";
import { QuestionData, getQuestion } from "./questionsData";
import { AnswersList } from "./AnswerList";
import { useForm } from "react-hook-form";

type FormData = {
    content: string;
};

export const QuestionPage = () => {
    const [question, setQuestion] = React.useState<QuestionData | null>(null);
    const { Id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {};

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
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="text-secondary d-flex justify-content-center m-4">
                                Your Answer
                            </h4>
                            <div className="form-floating">
                                <textarea
                                    {...register("content", {
                                        minLength: 55,
                                    })}
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                    style={{ height: "100px" }}
                                ></textarea>
                            </div>
                            {errors.content?.type === "minLength" && (
                                <p className="text-danger p-2 fs-6 fw-bold fst-italic opacity-75">
                                    this field requieres 50 characters as
                                    minimum length
                                </p>
                            )}
                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                            >
                                Submit your asnwer
                            </button>
                        </form>
                    </div>
                </blockquote>
            </div>
        </div>
    );
};
