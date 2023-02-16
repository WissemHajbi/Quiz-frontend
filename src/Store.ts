import { configureStore } from "@reduxjs/toolkit";
import { QuestionData } from "./questionsData";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface QuestionsState {
    // An array of unanswered questions
    readonly unanswered: QuestionData[];

    // Thether a server request is being made
    readonly loading: boolean;

    // The question that the user is currently viewing
    readonly viewing: QuestionData | null;

    // An array of questions mathced with the search
    readonly searched: QuestionData[];
}

export interface AppState {
    readonly questions: QuestionsState;
}

// Initial state for the store
const InitialQuestionState: QuestionsState = {
    unanswered: [],
    loading: false,
    viewing: null,
    searched: [],
};

// Actions for getting the unasnwered questions
export const GETTINGUNANSWEREDQUESTIONS = "GettingUnansweredQuestions";
export const gettingUnansweredQuestionsAction = () =>
    ({
        type: GETTINGUNANSWEREDQUESTIONS,
    } as const);

export const GOTUNANSWEREDQUESTIONS = "GotUnansweredQuestions";
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
    ({
        type: GOTUNANSWEREDQUESTIONS,
        questions: questions,
    } as const);

// Actions for getting the viewed question
export const GETTINGQUESTION = "GettingQuestion";
export const gettingQuestionAction = () =>
    ({
        type: GETTINGQUESTION,
    } as const);

export const GOTQUESTION = "GotQuestion";
export const gotQuestionAction = (question: QuestionData | null) =>
    ({
        type: GOTQUESTION,
        question: question,
    } as const);

// Actions for getting the searched questions
export const GETTINGSEARCHEDQUESTIONS = "GettingSearchedQuestions";
export const gettingSearchedQuestionsAction = () =>
    ({
        type: GETTINGSEARCHEDQUESTIONS,
    } as const);

export const GOTSEARCHEDQUESTIONS = "GotSearchedQuestions";
export const gotSearchedQuestionsAction = (questions: QuestionData[]) =>
    ({
        type: GOTSEARCHEDQUESTIONS,
        questions: questions,
    } as const);

type QuestionsActions =
    | ReturnType<typeof gettingUnansweredQuestionsAction>
    | ReturnType<typeof gotUnansweredQuestionsAction>
    | ReturnType<typeof gettingQuestionAction>
    | ReturnType<typeof gotQuestionAction>
    | ReturnType<typeof gettingSearchedQuestionsAction>
    | ReturnType<typeof gotSearchedQuestionsAction>;

const QuestionsReducer = (
    state = InitialQuestionState,
    action: QuestionsActions
) => {
    switch (action.type) {
        case GETTINGUNANSWEREDQUESTIONS: {
            return {
                ...state,
                loading: true,
            };
        }
        case GOTUNANSWEREDQUESTIONS: {
            return {
                ...state,
                loading: false,
                unanswered: action.questions,
            };
        }
        case GETTINGQUESTION: {
            return {
                ...state,
                loading: true,
                viewing: null,
            };
        }
        case GOTQUESTION: {
            return {
                ...state,
                loading: false,
                viewing: action.question,
            };
        }
        case GETTINGSEARCHEDQUESTIONS: {
            return {
                ...state,
                loading: true,
            };
        }
        case GOTSEARCHEDQUESTIONS: {
            return {
                ...state,
                loading: false,
                searched: action.questions,
            };
        }
    }
    return state;
};

export const store = configureStore<AppState>({
    reducer: {
        questions: QuestionsReducer,
    },
});

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
