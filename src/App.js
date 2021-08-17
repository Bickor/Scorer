import './App.css';
import Score from './Score.js';
import Leaderboard from './Leaderboard.js';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Scorer"
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scorer</h1>
        <div>
          <Leaderboard />
          <Score />
        </div>
      </header>
    </div>
  );
}

export default App;
