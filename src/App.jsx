import React, { useState } from "react";

const choices = ["rock", "paper", "scissors"];

const emoji = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

function formatMove(move) {
  return `${emoji[move]} ${move[0].toUpperCase()}${move.slice(1)}`;
}

function getResult(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

export default function App() {
  const [rounds, setRounds] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [streak, setStreak] = useState(0);
  const [winnerText, setWinnerText] = useState("");
  const [movesText, setMovesText] = useState("- : -");
  const [history, setHistory] = useState([]);

  function playRound(playerMove) {
    const computerMove = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(playerMove, computerMove);

    setRounds((n) => n + 1);
    setMovesText(`${formatMove(playerMove)} : ${formatMove(computerMove)}`);

    if (result === "win") {
      setWinnerText("YOU");
      setWins((n) => n + 1);
      setStreak((n) => n + 1);
    } else if (result === "lose") {
      setWinnerText("COMPUTER");
      setLosses((n) => n + 1);
      setStreak(0);
    } else {
      setWinnerText("DRAW");
      setStreak(0);
    }

    setHistory((old) => {
      const roundNo = rounds + 1;
      const resultText = result === "win" ? "You win!" : result === "lose" ? "Computer wins!" : "It's a draw!";

      return [
        {
          round: roundNo,
          playerMove,
          computerMove,
          resultText,
        },
        ...old,
      ];
    });
  }

  function resetGame() {
    setRounds(0);
    setWins(0);
    setLosses(0);
    setStreak(0);
    setWinnerText("-");
    setMovesText("- : -");
    setHistory([]);
  }

  return (
    <main className="container">
      <h1>🪨 Rock 📄 Paper ✂️ Scissors</h1>

      <section className="status-grid">
        <div className="card">
          <p className="label">Rounds Played</p>
          <p className="value">{rounds}</p>
        </div>
        <div className="card">
          <p className="label">Your Streak</p>
          <p className="value">{streak}</p>
        </div>
        <div className="card">
          <p className="label">Wins</p>
          <p className="value">{wins}</p>
        </div>
        <div className="card">
          <p className="label">Losses</p>
          <p className="value">{losses}</p>
        </div>
      </section>

      <section className="controls">
        <button className="move-btn" onClick={() => playRound("rock")}>
          🪨 Rock
        </button>
        <button className="move-btn" onClick={() => playRound("paper")}>
          📄 Paper
        </button>
        <button className="move-btn" onClick={() => playRound("scissors")}>
          ✂️ Scissors
        </button>
      </section>

      <section className="result card wide">
        <p className="score-line">YOU {wins} : {losses} COMPUTER</p>
        <p className="winner-line">{winnerText}</p>
        <p className="moves-display">YOU {movesText} COMPUTER</p>
      </section>

      <section className="history card wide">
        <div className="history-header">
          <h2>Move History</h2>
          <button className="reset-btn" onClick={resetGame}>
            Reset Game
          </button>
        </div>

        <ol>
          {history.length === 0 ? (
            <li>No moves yet.</li>
          ) : (
            history.map((entry) => (
              <li key={`${entry.round}-${entry.playerMove}-${entry.computerMove}`}>
                Round {entry.round}: You {formatMove(entry.playerMove)} | Computer{" "}
                {formatMove(entry.computerMove)} -&gt; {entry.resultText}
              </li>
            ))
          )}
        </ol>
      </section>
    </main>
  );
}
