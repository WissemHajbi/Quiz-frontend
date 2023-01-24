import { wait } from "@testing-library/user-event/dist/utils";

export interface QuestionData {
    Id: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}

export interface AnswerData {
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

const questions: QuestionData[] = [
    {
        Id: 1,
        title: "Why should I learn TypeScript?",
        content:
            "TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?",
        userName: "Bob",
        created: new Date(),
        answers: [
            {
                answerId: 1,
                content:
                    "To catch problems earlier speeding up your developments",
                userName: "Jane",
                created: new Date(),
            },
            {
                answerId: 2,
                content:
                    "So, that you can use the JavaScript features of tomorrow, today",
                userName: "Fred",
                created: new Date(),
            },
        ],
    },
    {
        Id: 2,
        title: "Which state management tool should I use?",
        content:
            "There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?",
        userName: "Bob",
        created: new Date(),
        answers: [],
    },
];

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
    await wait(200);
    return questions.filter((q) => q.answers.length === 0);
};

export const getQuestion = async (Id: number): Promise<QuestionData | null> => {
    const result = questions.filter((q) => q.Id == Id);
    return result.length === 0 ? null : result[0];
};

export const getAllQuestions = async (): Promise<QuestionData[]> => {
    await wait(200);
    return questions;
};

export const searchQuestions = async (
    critiria: string
): Promise<QuestionData[]> => {
    await wait(300);
    return questions.filter(
        (q) =>
            q.title.toLowerCase().indexOf(critiria.toLowerCase()) >= 0 ||
            q.content.toLowerCase().indexOf(critiria.toLowerCase()) >= 0
    );
};

export interface PostQuestionData {
    title: string;
    content: string;
    created: Date;
    userName: string;
}

export const postQuestion = async (
    question: PostQuestionData
): Promise<QuestionData | undefined> => {
    await wait(200);
    const Id = Math.max(...questions.map((q) => q.Id)) + 1;
    const newQuestion: QuestionData = {
        ...question,
        Id,
        answers: [],
    };
    questions.push(newQuestion);
    return newQuestion;
};

export interface PostAnswerData {
    Id: number;
    content: string;
    userName: string;
    created: Date;
}

export const postAnswer = async (
    answer: PostAnswerData
): Promise<AnswerData | undefined> => {
    await wait(500);
    const question = questions.filter((q) => q.Id === answer.Id)[0];
    question.answers.push({
        answerId: 99,
        ...answer,
    });
    return {
        answerId: 99,
        ...answer,
    };
};
