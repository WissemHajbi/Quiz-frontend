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
    Id: number;
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
                Id: 1,
                content:
                    "To catch problems earlier speeding up your developments",
                userName: "Jane",
                created: new Date(),
            },
            {
                Id: 2,
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
