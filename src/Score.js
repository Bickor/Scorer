import React from 'react';
import {auth, db} from './config.js';

class Score extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                    db: "",
                    player1: "",
                    score1: "",
                    player2: "",
                    score2: "",
                    scorers: []};

        this.handlePlayer1 = this.handlePlayer1.bind(this);
        this.handlePlayer2 = this.handlePlayer2.bind(this);
        this.handleScore1 = this.handleScore1.bind(this);
        this.handleScore2 = this.handleScore2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.sendUserData = this.sendUserData.bind(this);
    }

    getUserData() {
        let ref = db.ref('Scores');
        ref.on('value', snapshot => {
            snapshot.forEach(snap => {
                console.log(snap.val());
            });
        });
        console.log('DATA RETRIEVED');
    }

    sendUserData() {
        let date = new Date();
        console.log(date.getMonth());
        db.ref('Scores/' + date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()).push({
            Player1: "German",
            Player2: "Martin",
            Score1: "51",
            Score2: "60"
        });
    }

    handlePlayer1(event) {
        this.setState({player1: event.target.value});
    }

    handleScore1(event) {
        this.setState({score1: event.target.value});
    }

    handlePlayer2(event) {
        this.setState({player2: event.target.value});
    }

    handleScore2(event) {
        this.setState({score2: event.target.value});
    }
    
    handleSubmit(event) {
        if (this.state.player1 !== ""
            && this.state.score1 !== ""
            && this.state.player2 !== ""
            && this.state.score2 !== "") {
            this.setState(prevState => ({scorers: [...prevState.scorers, [this.state.player1, this.state.score1, this.state.player2, this.state.score2]]}))
        }

        let date = new Date();
        console.log(date.getMonth());
        db.ref('Scores/' + date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()).push({
            Player1: this.state.player1,
            Player2: this.state.player2,
            Score1: this.state.score1,
            Score2: this.state.score2
        });
        event.preventDefault();
    }
    

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Player 1: <input type="text" value={this.state.player1} onChange={this.handlePlayer1}/>
                    </label>
                    <label>
                        Score 1: <input type="text" value={this.state.score1} onChange={this.handleScore1}/>
                    </label>
                    <label>
                        Player 2: <input type="text" value={this.state.player2} onChange={this.handlePlayer2}/>
                    </label>
                    <label>
                        Score 2: <input type="text" value={this.state.score2} onChange={this.handleScore2}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                {this.state.scorers.map((score, index) => {
                    return (<p key={index}>{score[0]} {score[1]} - {score[3]} {score[2]}</p>)
                })}
                <button onClick={this.getUserData}>Get User Data</button>
                <button onClick={this.sendUserData}>Set User Data</button>
            </div>
        );
    }
}

export default Score;