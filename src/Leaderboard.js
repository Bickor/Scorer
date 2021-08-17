import React from 'react';
import { auth, db} from './config';

class Leaderboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leaderbaord: []
        }

        this.getLeaderBoard = this.getLeaderBoard.bind(this);

        this.getLeaderBoard();
    }

    getLeaderBoard() {

        this.setState(prevState => ({leaderbaord: []}));
        auth().onAuthStateChanged((user) => {
            if (user) {
                // If the user is logged in

                // This prevents duplicate elements.
                this.setState(prevState => ({leaderboard: []}));

                let ref = db.ref('Leaderboard');
                ref.on('value', snapshot => {

                    snapshot.forEach(snap => {

                        snap.forEach(s => {

                            // Put value first in order to use .sort() in render() and sort by value.
                            this.setState(prevState => ({leaderbaord: [[s.val(), snap.key], ...prevState.leaderbaord]}))
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

    render() {
        return (
            <div>
                {this.state.leaderbaord.sort().map((player, index) => {
                    console.log(index);
                    return (<p key={index}>{player[1]}: {player[0]}</p>)
                })}
            </div>
        );
    }

}

export default Leaderboard