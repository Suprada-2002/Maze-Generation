// Grid.js
import { useEffect, useState } from "react";
import Cell from "./Cell";
import { generateMaze } from "../algorithm/Recursivebacktracking";
import { generatePrimsMaze } from "../algorithm/Prims";
import { generateKruskalsMaze } from '../algorithm/Kruskal';

function Grid() {
  const noOfRows = 25;
  const noOfCols = 25;
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
        await generateMaze(clearedGrid, setGrid);
        break;
      case "PRIMS":
        await generatePrimsMaze(clearedGrid, setGrid);
        break;
    case 'KRUSKAL':
      await generateKruskalsMaze(clearedGrid, setGrid);
      break;
      default:
        break;
    }
  };

  return (
    <div className="container p-4">
      
      <nav className="mb-4">
        <h2 className="font-bold mb-4 text-xl">Maze Generation</h2>
        <button
          onClick={() => visualize("DFS")}
          className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700">Backtracking Algo/Randomized DFS</button>
        <button onClick={() => visualize('PRIMS')} className="py-3 px-2 bg-blue-500 text-white rounded-md">Randomized Prim's Algorithm</button>
        <button onClick={() => visualize('KRUSKAL')} className="py-3 px-2 bg-green-500 text-white rounded-md">Kruskal's</button>
        <button onClick={resetGrid} className="py-3 px-2 bg-blue-500 text-white rounded-md">Rest Grid</button>
      </nav>

      <table
        className="bg-black mx-auto container border-collapse"
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
