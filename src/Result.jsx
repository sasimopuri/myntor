const Result=(props)=>{
    const totalQuestions=props.totalQuestions
    const score=props.score
    return(
        <div className="result">
            <div className="score-card">
                <p><span>Correct Questions: </span>{score}</p>
                <p><span>Total Questions: </span>{totalQuestions}</p>
            </div>
        </div>
    )
}

export default Result