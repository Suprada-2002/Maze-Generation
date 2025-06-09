// Recursivebacktracking.js
export async function generateMaze(grid, setGrid, delay = 30) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0], // up
  ];

  function isInBounds(row, col) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  }

  async function backtrack(row, col) {
    if (!isInBounds(row, col) || visited[row][col]) return;

    visited[row][col] = true;
    grid[row][col].isWall = false;
    grid[row][col].isVisited = true;

    setGrid([...grid]);
    await sleep(delay);

    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
      const newRow = row + dx * 2;
      const newCol = col + dy * 2;

      if (isInBounds(newRow, newCol) && !visited[newRow][newCol]) {
        const wallRow = row + dx;
        const wallCol = col + dy;

        if (isInBounds(wallRow, wallCol)) {
          grid[wallRow][wallCol].isWall = false;
          grid[wallRow][wallCol].isVisited = true;
        }

        setGrid([...grid]);
        await sleep(delay);

        await backtrack(newRow, newCol);
      }
    }
  }

  // Ensure start cell is odd (to avoid walls)
  const startRow = Math.floor(Math.random() * ((numRows - 1) / 2)) * 2 + 1;
  const startCol = Math.floor(Math.random() * ((numCols - 1) / 2)) * 2 + 1;

  await backtrack(startRow, startCol);

  // Cleanup: restore special cells
  grid.forEach((row) =>
    row.forEach((cell) => {
      cell.isVisited = false;
      if (cell.isStart || cell.isEnd) {
        cell.isWall = false;
      }
    })
  );

  setGrid([...grid]);
}
