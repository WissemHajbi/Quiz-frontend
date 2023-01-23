import { Page } from "./Page";
import { useForm } from "react-hook-form";
import { truncate } from "fs/promises";
import { ErrorResponse } from "@remix-run/router";
import React from "react";

type FormData = {
    title: string;
    content: string;
};

export const AskPage = () => {
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {};

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
                            >
                                Submit your question
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default AskPage;
