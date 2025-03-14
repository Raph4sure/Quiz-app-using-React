import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0
};

function reducer(state, action) {
    switch (action.type) {
        case "dataRecieved":
            return {
                ...state,
                status: "ready",
                questions: action.payload,
            };

        case "dataFailed":
            return {
                ...state,
                status: "error",
            };

        case "start":
            return {
                ...state,
                status: "active",
            };

        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };

        case "finish":
            return { ...state, status: "finished" , highscore: state.points < state.highscore ? state.highscore : state.points}
        
        case "restartQuiz": 
            return{...initialState, status: "ready",highscore: state.highscore, questions: state.questions}

        default:
            throw new Error("Unknown Action");
    }
}

export default function App() {
    const [{ status, questions, index, answer, points, highscore }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestion = questions.length;
    const totalPoints = questions.reduce((prev, cur) => prev + cur.points ,0 )

    useEffect(function () {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataRecieved", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestion={numQuestion}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress numQuestion={numQuestion} index={index} points={points} answer={answer}
                        totalPoints={totalPoints}
                        />
                        <Questions
                            question={questions[index]}
                            answer={answer}
                            dispatch={dispatch}
                        />
                        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestion} />
                    </>
                )}
                {status === "finished" && (<FinishedScreen points={points} totalPoints={totalPoints} highscore={highscore} dispatch={dispatch} />)}
            </Main>
        </div>
    );
}
