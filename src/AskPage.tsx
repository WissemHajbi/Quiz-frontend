import { Page } from "./Page";
import { useForm } from "react-hook-form";

type FormData = {
    title: string;
    content: string;
};

export const AskPage = () => {
    const { register } = useForm<FormData>();

    return (
        <Page title="Ask a question">
            <div className="container d-flex justify-content-center">
                <div className="card" style={{ width: "50%" }}>
                    <div className="card-body d-flex justify-content-center">
                        <form action="">
                            <h5 className="card-title">Title</h5>
                            <input
                                {...register("title")}
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="enter the title"
                                style={{ width: "50%" }}
                            />
                            <h5 className="card-title mt-4">Content</h5>
                            <input
                                {...register("content")}
                                type="text"
                                className="form-control"
                                id="content"
                                name="content"
                                placeholder="enter the content"
                                style={{ width: "50%" }}
                            />
                            <p className="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                            <button type="submit" className="btn btn-success">
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
