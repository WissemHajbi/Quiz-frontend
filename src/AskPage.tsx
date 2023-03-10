import { Page } from "./Page";
import { useForm, useFormState } from "react-hook-form";
import { postQuestion } from "./questionsData";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

type FormData = {
    title: string;
    content: string;
};

export const AskPage = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormData>();

    const [successfull, setSuccessfull] = React.useState(false);
    const [accessToken, setaccessToken] = React.useState("");

    const onSubmit = async (data: FormData) => {
        const res = await postQuestion({
            title: data.title,
            content: data.content,
            accessToken: accessToken,
        });
        setSuccessfull(res ? true : false);
    };

    React.useEffect(() => {
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
    }, []);

    return (
        <Page title="Ask a question">
            <div className="container d-flex justify-content-center">
                <div className="card" style={{ width: "50%" }}>
                    <div className="card-body ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="card-title">Title</h5>
                            <input
                                type="text"
                                {...register("title", {
                                    required: true,
                                })}
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="enter the title"
                            />
                            {errors.title &&
                                errors.title.type === "required" && (
                                    <p className="text-danger p-2 fs-6 fw-bold fst-italic opacity-75">
                                        this field is requiered
                                    </p>
                                )}
                            <h5 className="card-title mt-4">Content</h5>
                            <div className="form-floating">
                                <textarea
                                    {...register("content", {
                                        required: true,
                                        minLength: 10,
                                    })}
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    style={{ height: "70px" }}
                                ></textarea>
                            </div>
                            {errors.content?.type === "required" && (
                                <p className="text-danger p-2 fs-6 fw-bold fst-italic opacity-75">
                                    this field is requiered
                                </p>
                            )}
                            {errors.content?.type === "minLength" && (
                                <p className="text-danger p-2 fs-6 fw-bold fst-italic opacity-75">
                                    10 characters are minimum in this field
                                </p>
                            )}
                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                                disabled={successfull}
                            >
                                Submit your question
                            </button>
                            {successfull && (
                                <p className="text-success p-2 fs-6 fw-bold fst-italic opacity-75">
                                    form is submitted successfully :)
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default AskPage;
