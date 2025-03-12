import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataRecieved":
            return {
                ...state, status: "ready",
                questions: action.payload
            };
        
        case "dataFailed":
            return {
                ...state, status: "error"
            }
        
        case "start":
            return {
                ...state, status: "active"
            }

        default:
            throw new Error("Unknown Action");
    }
}

export default function App() {
    const [{ status, questions, index }, dispatch] = useReducer(reducer, initialState);
    
   const  numQuestion = questions.length

    useEffect(function () {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataRecieved", payload: data }))
            .catch((err) => dispatch({type: "dataFailed"}));
    }, []);
    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestion={numQuestion} dispatch={dispatch} />}
                {status === "active" && <Questions question={questions[index] } />}
            </Main>
        </div>
    );
}
