import React from 'react';

function Result(props) {
    let questions = props.questions;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })
    console.log(questions);

    let correctAnswers = 0;

    for(let i = 0; i < questions.length; i++){
        if(questions[i].isCorrect === true) correctAnswers++;
    }

    function refreshPage(){
        window.location.reload();
    } 
    
    let scoredPercentage = Math.floor(correctAnswers/questions.length*100);

    return (
        <div className="result quiz--box">
            <h2 className="text-center font-weight-normal">Quiz Result</h2>
            <h3 className="correct--answers">{scoredPercentage}%</h3>
            <h4 className="correct--answers--number">Your score is {correctAnswers} out of {questions.length} questions</h4>
            {questions.map((q, index) =>
                <div key={q.id} className={`mb-2 ${q.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                    <div className="result-question">
                        <h4>{index + 1}. {q.name}</h4>
                        <div className="row">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                    </div>
                                )
                            }
                        </div>
                        <div>The correct answer is: {q.options.map(option => option.isAnswer === true ? option.name : "" )}</div>
                        <div className={`m-1 p-1 text-bold ${q.isCorrect ? 'text-success' : 'text-danger'}`}>Your answer is {q.isCorrect ? 'Correct' : 'Incorrect'}.</div>
                    </div>
                </div>
            )}
            
            {scoredPercentage > 90 ? <h4 className="alert alert-info text-center">Awesome <span role="img" aria-label="awesome">🤩</span></h4> : <h4 className="alert alert-info text-center">Better luck next time <span role="img" aria-label="awesome">😃</span></h4>}
            <button className="alert alert-info text-center" onClick={refreshPage}>Play again!</button>
        </div>
    )
}

export default Result;