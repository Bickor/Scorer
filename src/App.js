import './App.css';
import Score from './Score.js';

let currentCount = 0;

function increment() {
  document.getElementById("count").innerText = ++currentCount;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Scorer</h1>
        <button onClick={increment}>Increment</button>
        <div>
          <p id = "count">0</p>
        </div>
        <div>
          <Score />
        </div>
      </header>
    </div>
  );
}

export default App;
