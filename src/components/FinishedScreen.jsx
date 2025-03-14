function FinishedScreen({ points, totalPoints }) {
    const percentage = (points/totalPoints) * 100
    return (
        <div>
            <p className="result">You scored {points} out of {totalPoints} ({Math.ceil( percentage )}%)</p>
        </div>
    )
}

export default FinishedScreen
