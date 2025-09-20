import React from "react";
import "./App.css";

function App() {
  return (
    <main className="page">
      <svg
        className="svg-circle"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </main>
  );
}

export default App;
