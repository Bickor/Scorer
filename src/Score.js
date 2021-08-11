import React from 'react';

class Score extends React.Component {

    constructor(props) {
        super(props);
        this.state = {scorer: "",
                      scorers: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.appendData = this.appendData.bind(this);
        //this.appendWrittenData = this.appendWrittenData.bind(this);
    }
    /**
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

    appendWrittenData = (event) => {
        const newData = {
            name1: "Silvana",
            score1: "30",
            name2: "Martin",
            score2: "20"
        }
        this.setState(prevState => ({scores: [...prevState.scores, newData]}))
    }
    */

    handleChange(event) {
        this.setState({scorer: event.target.value});
        // console.log(event.target.value);
        //event.preventDefault();
    }

    
    handleSubmit(event) {
        this.setState(prevState => ({scorers: [...prevState.scorers, this.state.scorer]}))
        console.log(this.state.scorer);
        event.preventDefault();
    }

    /**
     {this.state.scorer.map((score, index) => {
                    return (<p key={index}>{score}</p>);
                    //return (<p key={index}>{score.name1} {score.score1} - {score.name2} {score.score2}</p>);
                    })}
     */
    

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: <input type="text" value={this.state.scorer} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.appendData}>Add Score</button>
                {this.state.scorers.map((score, index) => {
                    return (<p key={index}>{score}</p>)
                })}
                
                
            </div>
        );
    }
}

export default Score;