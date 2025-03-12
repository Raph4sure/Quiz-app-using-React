function StartScreen({numQuestion, dispatch}) {
    return (
        <div className="start">
            <h2>First Term Examination</h2>
            <h3>Subject: Computer Studies</h3>
            <h3>
                You have total of<span style={{ color:"yellow" }}> {numQuestion}</span> questions to answer
            </h3>
            <button className="btn btn-ui" onClick={()=> dispatch({type: "start"})}>Am Ready</button>
        </div>
    );
}

export default StartScreen
