import React from 'react';

class Score extends React.Component {
    state = {
        scores: [{
            name1: "German",
            score1: "50",
            name2: "Martin",
            score2: "37"
        }]
    }

    appendData = () => {
        const newData = {
            name1: "German",
            score1: "50",
            name2: "Martin",
            score2: "70"
        }
        this.setState(prevState => ({scores: [...prevState.scores, newData]}))
    }

    render() {
        return (
            <div>
                <button onClick={this.appendData}>Add Score</button>
                {this.state.scores.map(score => {
                    return (<p key={score}>{score.name1} {score.score1} - {score.name2} {score.score2}</p>);
                })}
            </div>
        );
    }
}

export default Score;