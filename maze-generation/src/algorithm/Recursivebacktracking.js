// Recursivebacktracking.js (maze generator)
export async function generateMaze(grid, setGrid, delay = 30) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  async function backtrack(row, col) {
    visited[row][col] = true;
    grid[row][col].isWall = false; // mark current cell as path
    grid[row][col].isVisited = true;
    setGrid([...grid]);
    await sleep(delay);

    // Shuffle directions for randomness
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
      const newRow = row + dx * 2;
      const newCol = col + dy * 2;

      if (
        newRow > 0 &&
        newRow < numRows &&
        newCol > 0 &&
        newCol < numCols &&
        !visited[newRow][newCol]
      ) {
        // Remove wall between current and next cell
        grid[row + dx][col + dy].isWall = false;
        grid[row + dx][col + dy].isVisited = true;

        setGrid([...grid]);
        await sleep(delay);

        await backtrack(newRow, newCol);
      }
    }

    // Optionally unmark visited for animation purposes
    // grid[row][col].isVisited = false;
    // setGrid([...grid]);
    // await sleep(delay);
  }

  // Choose random odd start cell inside the grid
  const startRow = Math.floor(Math.random() * (numRows / 2)) * 2 + 1;
  const startCol = Math.floor(Math.random() * (numCols / 2)) * 2 + 1;

  await backtrack(startRow, startCol);

  // Mark start/end cells explicitly as path & not visited
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
