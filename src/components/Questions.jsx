import Options from "./Options";

function Questions({question}) {
    return (
        <div>
            <h2>{question.question}</h2>
           <Options question={question}/>
        </div>
    );
}

export default Questions
