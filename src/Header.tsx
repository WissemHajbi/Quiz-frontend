import React from "react";
import { UserIcon } from "./Icons";
import { Link, useSearchParams } from "react-router-dom";

export const Header = () => {
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value);
    };

    const [searchParams] = useSearchParams();
    const critiria = searchParams.get("critiria") || "";
    const [search, setSearch] = React.useState(critiria);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(search);
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
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchInputChange}
                />
            </form>
        </div>
    );
};
