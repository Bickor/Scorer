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

    }

    getUserData() {

        auth().onAuthStateChanged((user) => {
            if (user) {
                // This prevents duplicate elements.
                this.setState(prevState => ({scorers: []}));

                let ref = db.ref('Scores');
                ref.on('value', snapshot => {
                    
                    // Get each day
                    snapshot.forEach(snap => {

                        // Get each match
                        snap.forEach(s => {
                            this.setState(prevState => ({scorers: [[s.val().Player1, s.val().Score1, s.val().Player2, s.val().Score2], ...prevState.scorers]}))
                        });
                    });
                });
            } else {
                var provider = new auth.GoogleAuthProvider();
                auth().signInWithPopup(provider).then((result) => {
                    this.setState(prevState => ({loggedIn: true}))
                });
            }
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

            auth().onAuthStateChanged((user) => {
                if (user) {
                    // If the user is logged in.

                    // Get the current date to add to the database. Month is zero indexed so we need to add one.
                    let date = new Date();
                    db.ref('Scores/' + date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()).push({
                        Player1: this.state.player1,
                        Player2: this.state.player2,
                        Score1: this.state.score1,
                        Score2: this.state.score2
                    });

                    // Weird fix that prevents duplication of games in page. Needs fix.
                    // TODO(Bickor): Remove this call and simply add the latest match to the scores.
                    this.getUserData();
                } else {
                    // Login if not authenticated.
                    var provider = new auth.GoogleAuthProvider();
                    auth().signInWithPopup(provider).then((result) => {
                        this.setState(prevState => ({loggedIn: true}))
                    });
                }
            });
        }

        // Prevents page reload
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
                <div>
                    {this.state.scorers.map((score, index) => {
                        return (<p key={index}>{score[0]} {score[1]} - {score[3]} {score[2]}</p>);
                    })}
                </div>
                <button onClick={this.getUserData}>Get data</button>
            </div>
        );
    }
}

export default Score;