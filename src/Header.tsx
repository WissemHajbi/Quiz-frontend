import React from "react";
import { UserIcon } from "./Icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
    search: string;
};

export const Header = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [searchParams] = useSearchParams();
    const critiria = searchParams.get("critiria") || "";
    const navigate = useNavigate();

    const onSubmit = ({ search }: FormData) => {
        navigate(`search?critiria=${search}`);
    };

    return (
        <div className="navbar">
            <Link to="./" className="text-secondary text-decoration-none">
                Q & A
            </Link>
            <Link to="./signin" className="text-secondary text-decoration-none">
                <UserIcon />
                <span>Sign In</span>
            </Link>
            <form
                className="d-flex"
                role="search"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    {...register("search")}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    defaultValue={critiria}
                />
            </form>
        </div>
    );
};
