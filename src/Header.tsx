import React from "react";
import { UserIcon } from "./Icons";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
    search: string;
};

export const Header = () => {
    const { register } = useForm<FormData>();
    const [searchParams] = useSearchParams();
    const critiria = searchParams.get("critiria") || "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
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
