import { Page } from "./Page";
import { useSearchParams } from "react-router-dom";
import { QuestionList } from "./QuestionList";
import { searchQuestions, QuestionData } from "./questionsData";
import React from "react";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("critiria") || "";
    const [questions, setQuestions] = React.useState<QuestionData[]>();

    React.useEffect(() => {
        const doSearch = async (critiria: string) => {
            const result = await searchQuestions(critiria);
            setQuestions(result);
        };
        doSearch(search);
    }, [search]);

    return (
        <Page title="Search Results">
            {search && (
                <p className="text-secondary fst-italic">for "{search}"</p>
            )}{" "}
            <QuestionList data={questions} />
        </Page>
    );
};
