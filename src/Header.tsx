import React from "react";
import { UserIcon } from "./Icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";

type FormData = {
    search: string;
};

export const Header = () => {
    const { isAuthenticated, user, isLoading } = useAuth0();
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
            {!isLoading &&
                (isAuthenticated ? (
                    <div>
                        <span className="m-4 fw-bold">{user?.name}</span>
                        <Link
                            to="./signout"
                            className="text-secondary text-decoration-none"
                        >
                            <UserIcon />
                            <span>Sign Out</span>
                        </Link>
                    </div>
                ) : (
                    <Link
                        to="./signin"
                        className="text-secondary text-decoration-none"
                    >
                        <UserIcon />
                        <span>Sign In</span>
                    </Link>
                ))}
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
