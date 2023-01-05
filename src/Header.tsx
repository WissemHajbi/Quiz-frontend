import React from "react";
import { UserIcon } from "./Icons";
import { Link } from "react-router-dom";

export const Header = () => {
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(e.target.value);
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
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                />
            </form>
        </div>
    );
};
