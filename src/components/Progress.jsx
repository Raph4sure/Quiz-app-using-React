function Progress({ numQuestion, index, points, answer, totalPoints }) {
    return (
        <div className="progress">
            <progress max={numQuestion} value={index + Number(answer !== null)}/>
            <header>
                Question <strong>{index + 1}</strong>/15
            </header>
            <p><strong>{ points }</strong>/{totalPoints}</p>
        </div>
    );
}

export default Progress;
