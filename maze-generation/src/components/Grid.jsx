// Grid.js
import { useEffect, useState } from "react";
import Cell from "./Cell";
import { generateMaze } from "../algorithm/Recursivebacktracking";

function Grid() {
  const noOfRows = 45;
  const noOfCols = 45;
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const END_NODE_ROW = noOfRows - 2;
  const END_NODE_COL = noOfCols - 2;

  const [grid, setGrid] = useState([]);

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

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  const visualize = async (algo) => {
    switch (algo) {
      case "DFS":
        await generateMaze(grid, setGrid);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container p-4">
      <h2 className="font-bold mb-4 text-xl">Maze Generation</h2>
      <nav className="mb-4">
        <button
          onClick={() => visualize("DFS")}
          className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Generate Maze (DFS)
        </button>
      </nav>

      <table
        className="bg-black mx-auto border-collapse"
        style={{ borderSpacing: 0 }}
      >
        <tbody>
          {grid.map((row, rowIdx) => (
            <tr key={rowIdx}>
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
