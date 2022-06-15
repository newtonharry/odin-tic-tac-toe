import { useState } from "react";
import "./App.css";
import { Game } from "./components/Game";
function App() {
  const [gameType, setGameType] = useState(0);

  return (
    <div className="App">
      <div className="header">
        <h1 className="neon-title">Tic Tac Toe</h1>
      </div>
      <div className="game">
        <Game gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
