import { wait } from "@testing-library/user-event/dist/utils";
import internal from "stream";

export interface QuestionData {
    questionId: number;
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
        questionId: 1,
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
        questionId: 2,
        title: "Which state management tool should I use?",
        content:
            "There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?",
        userName: "Bob",
        created: new Date(),
        answers: [],
    },
];

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
    let unansweredQuestions: QuestionData[] = [];
    const response = await fetch("http://localhost:5241/questions/unanswered");
    unansweredQuestions = await response.json();
    return unansweredQuestions.map((question) => ({
        ...question,
        created: new Date(question.created),
    }));
};

export const getQuestion = async (Id: number): Promise<QuestionData | null> => {
    const response = await fetch(`http://localhost:5241/questions/${Id}`);
    const question = await response.json();
    return mapQuestionFromServer(question);
};

export const getAllQuestions = async (): Promise<QuestionData[]> => {
    await wait(200);
    const response = await fetch("http://localhost:5241/questions");
    const questions: QuestionData[] = await response.json();
    return questions.map((question) => ({
        ...question,
        created: new Date(question.created),
    }));
};

export const searchQuestions = async (
    critiria: string
): Promise<QuestionData[]> => {
    await wait(300);
    const response = await fetch(
        `http://localhost:5241/questions?search=${critiria}`
    );
    const questions: QuestionData[] = await response.json();
    return questions.map((question) => ({
        ...question,
        created: new Date(question.created),
    }));
};

export interface PostQuestionData {
    title: string;
    content: string;
    accessToken: string;
}

export const postQuestion = async (
    question: PostQuestionData
): Promise<QuestionData | undefined> => {
    await wait(200);
    const response = await fetch(`http://localhost:5241/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${question.accessToken}`,
        },
        body: JSON.stringify({
            Title: question.title,
            Content: question.content,
        }),
    });

    const postedQuestion = await response.json();
    return postedQuestion;
};

export interface PostAnswerData {
    Id: number;
    content: string;
    accessToken: string;
}

export const postAnswer = async (
    answer: PostAnswerData
): Promise<AnswerData | undefined> => {
    await wait(500);
    const response = await fetch(
        `http://localhost:5241/questions/${answer.Id}/answer`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${answer.accessToken}`,
            },
            body: JSON.stringify({
                Content: answer.content,
            }),
        }
    );
    const postedAnswer = await response.json();
    return postedAnswer;
};

export interface QuestionDataFromServer {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: string;
    answers: Array<{
        answerId: number;
        content: string;
        userName: string;
        created: string;
    }>;
}

export const mapQuestionFromServer = (
    question: QuestionDataFromServer
): QuestionData => ({
    ...question,
    created: new Date(question.created),
    answers: question.answers
        ? question.answers.map((answer) => ({
              ...answer,
              created: new Date(answer.created),
          }))
        : [],
});
