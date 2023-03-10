import { Page } from "./Page";
import React from "react";
import { useParams } from "react-router-dom";
import { QuestionData, getQuestion } from "./questionsData";
import { AnswersList } from "./AnswerList";
import { useForm } from "react-hook-form";
import { postAnswer } from "./questionsData";
import { useSelector, useDispatch } from "react-redux";
import { AppState, gettingQuestionAction, gotQuestionAction } from "./Store";
import { useAuth0 } from "@auth0/auth0-react";

type FormData = {
    content: string;
};

export const QuestionPage = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const question = useSelector((state: AppState) => state.questions.viewing);
    const { Id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [successfull, setSuccessfull] = React.useState(false);
    const [accessToken, setaccessToken] = React.useState("");

    const onSubmit = async (data: FormData) => {
        const res = await postAnswer({
            Id: question!.questionId,
            content: data.content,
            accessToken: accessToken,
        });
        setSuccessfull(res ? true : false);
    };

    React.useEffect(() => {
        const doGetQuestion = async (Id: number) => {
            dispatch(gettingQuestionAction());
            const foundQuestion = await getQuestion(Id);
            dispatch(gotQuestionAction(foundQuestion));
        };
        if (Id) {
            doGetQuestion(Number(Id));
        }
        try {
            if (isAuthenticated) {
                const getaccess = async () => {
                    const accesstoken = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: "https://qanda",
                            scope: "openid profile QandAAPI email",
                        },
                    });
                    setaccessToken(accesstoken);
                };
                getaccess();
            }
        } catch (err) {
            console.log(err);
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
                        {isAuthenticated && (
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
                                    disabled={successfull}
                                >
                                    Submit your asnwer
                                </button>
                                {successfull && (
                                    <p className="text-success p-2 fs-6 fw-bold fst-italic opacity-75">
                                        your answer has been submitted
                                        successfully
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </blockquote>
            </div>
        </div>
    );
};
