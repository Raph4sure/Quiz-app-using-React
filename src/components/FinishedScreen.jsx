function FinishedScreen({ points, totalPoints, highscore, dispatch }) {
    const percentage = (points/totalPoints) * 100
    return (
        <div>
            <p className="result">You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)</p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={() => dispatch({type: "restartQuiz"})}>Restart-Quiz</button>
        </div>
    )
}

export default FinishedScreen;
