import { Page } from "./Page";
import { useSearchParams } from "react-router-dom";
import { QuestionList } from "./QuestionList";
import { searchQuestions } from "./questionsData";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppState,
    gettingSearchedQuestionsAction,
    gotSearchedQuestionsAction,
} from "./Store";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("critiria") || "";
    const questions = useSelector(
        (state: AppState) => state.questions.searched
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        const doSearch = async (critiria: string) => {
            dispatch(gettingSearchedQuestionsAction());
            const result = await searchQuestions(critiria);
            dispatch(gotSearchedQuestionsAction(result));
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
