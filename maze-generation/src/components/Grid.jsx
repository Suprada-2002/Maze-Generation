// Grid.js
import { useEffect, useState } from "react";
import Cell from "./Cell";
import { generateMaze } from "../algorithm/Recursivebacktracking";
import { generatePrimsMaze } from "../algorithm/Prims";
import { generateKruskalsMaze } from '../algorithm/Kruskal';
import Legend from '../assets/Legend'

function Grid() {
  const noOfRows = 25;
  const noOfCols = 25;
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const END_NODE_ROW = noOfRows - 2;
  const END_NODE_COL = noOfCols - 2;

  const [grid, setGrid] = useState([]);
  const [isRunning, setIsRunning] =  useState(false);

  const createCell = (row, col) => {
    return {
      row,
      col,
      isWall: true, // initially all walls
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      isVisited: false,
    };
  };

  const getInitialGrid = () => {
    const initialGrid = [];
    for (let i = 0; i < noOfRows; i++) {
      const currentRow = [];
      for (let j = 0; j < noOfCols; j++) {
        currentRow.push(createCell(i, j));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const resetGrid = () => {
  const newGrid = grid.map((row, rowIdx) =>
    row.map((cell, colIdx) => ({
      ...cell,
      isWall: true,
      isStart: rowIdx === START_NODE_ROW && colIdx === START_NODE_COL,
      isEnd: rowIdx === END_NODE_ROW && colIdx === END_NODE_COL,
    }))
  );
  setGrid(newGrid);
  return newGrid;
};


  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  const visualize = async (algo) => {
     const clearedGrid = resetGrid(); 
    switch (algo) {
      case "DFS":
        setIsRunning(true);
        await generateMaze(clearedGrid, setGrid);
        setIsRunning(false);
        break;
      case "PRIMS":
        setIsRunning(true);
        await generatePrimsMaze(clearedGrid, setGrid);
        setIsRunning(false);
        break;
      case 'KRUSKAL':
        setIsRunning(true);
        await generateKruskalsMaze(clearedGrid, setGrid);
        setIsRunning(false);
        break;
      default:
          break;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col items-center">
      <nav className="bg-gray-900 w-full max-w-4xl rounded-lg shadow-lg flex flex-wrap justify-between items-center px-6 py-3 mb-6">
        <h2 className="font-extrabold text-xl text-white select-none">Maze Generation Visualizer</h2>

        <div className="flex flex-wrap gap-3 mt-3 sm:mt-0">
          {[
            { label: "DFS", onClick: () => visualize("DFS") },
            { label: "Randomized Prim's", onClick: () => visualize("PRIMS") },
            { label: "Kruskal's", onClick: () => visualize("KRUSKAL") },
            { label: "Reset Grid", onClick: resetGrid },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              disabled={isRunning}
              onClick={onClick}
              className={isRunning ? "bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-500 hover:to-gray-300 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300" : "bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-500 hover:to-indigo-300 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <Legend />

     <table
  className="bg-gray-800 max-w-xl w-full rounded-md border border-gray-700 border-collapse"
  style={{ borderSpacing: 2 }}
  role="grid"
  aria-label="Maze Grid"
>
  <tbody>
    {grid.map((row, rowIdx) => (
      <tr key={rowIdx} role="row">
        {row.map((cell, cellIdx) => (
          <Cell
            key={cellIdx}
            row={cell.row}
            col={cell.col}
            isWall={cell.isWall}
            isStart={cell.isStart}
            isEnd={cell.isEnd}
            isVisited={cell.isVisited}
          />
        ))}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Grid;
