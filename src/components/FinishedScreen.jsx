function FinishedScreen({ points, totalPoints, highscore }) {
    const percentage = (points/totalPoints) * 100
    return (
        <div>
            <p className="result">You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)</p>
            <p className="highscore">(Highscore: { highscore } points)</p>
        </div>
    )
}

export default FinishedScreen;
