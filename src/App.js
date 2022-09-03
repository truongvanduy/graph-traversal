import "./Utilites.css";
import "./App.css";

// import InputSection from "./InputSection";
// import ResultSection from "./ResultSection";
import { useRef, useState } from "react";
import Graph from "./Graph";

function App() {
  const keyRef = useRef("graph_input");
  const STORAGE_INPUT_KEY = keyRef.current;
  const savedInput = localStorage.getItem(STORAGE_INPUT_KEY) || "";

  const [input, setInput] = useState(savedInput);
  const [graph, setGraph] = useState(new Graph(savedInput));
  const [Dfs, setDfs] = useState(() => () => {});
  const [dfsResult, setDfsResult] = useState([]);
  const [Bfs, setBfs] = useState(() => () => {});
  const [bfsResult, setBfsResult] = useState([]);

  function hanldeChangeInput(e) {
    const value = e.target.value;

    setInput(value);
    setGraph(new Graph(value));
    localStorage.setItem(STORAGE_INPUT_KEY, value);
  }

  function handleShowDfs() {
    // Unmount BFS
    setBfs(null);
    setBfsResult(null);

    setDfs(() => () => graph.debugDFS(1));
    setDfsResult(graph.dfs(1));
  }
  function handleShowBfs() {
    // Unmount DFS
    setDfs(null);
    setDfsResult(null);

    setBfs(() => () => graph.debugBFS(1));
    setBfsResult(graph.bfs(1));
  }

  return (
    <div className="App">
      <div className="wrapper mt-8">
        {/* INPUT SECTION */}

        <section className="section-input">
          {/* Input vertices */}
          <div className="input-group">
            <textarea
              value={input}
              className="input"
              onInput={hanldeChangeInput}
              rows="8"
              col="20"
            />
            <div className="flex-col w-full g-20">
              <button className="button fl-center full" onClick={handleShowDfs}>
                DFS
              </button>
              <button className="button fl-center full" onClick={handleShowBfs}>
                BFS
              </button>
            </div>
          </div>
          {/* DFS process */}
          {Dfs && <Dfs />}
          {Bfs && <Bfs />}
          {/* DFS Result */}
          {dfsResult && (
            <div style={{ fontSize: 24, textAlign: "center", marginTop: 40 }}>
              {dfsResult.length === 0 ? null : "Thứ tự duyệt"}
              <br />
              {dfsResult.join(" -> ")}
            </div>
          )}
          {bfsResult && (
            <div style={{ fontSize: 24, textAlign: "center", marginTop: 40 }}>
              {bfsResult.length === 0 ? null : "Thứ tự duyệt"}
              <br />
              {bfsResult.join(" -> ")}
            </div>
          )}
          <div style={{ paddingBottom: 120 }}></div>
        </section>

        {/* RESULT TABLE */}

        {/* <div className="flex-col">
          <table className="table">
            <thead></thead>
            <tbody>
              {graph.Data.map((row) => (
                <tr>
                  {row.map((cell) => (
                    <td className="pb-2 pi-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default App;
