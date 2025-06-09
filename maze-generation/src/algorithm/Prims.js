export async function generatePrimsMaze(grid, setGrid, delay = 20) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const isInBounds = (r, c) => r >= 0 && r < numRows && c >= 0 && c < numCols;

  const walls = [];

  const startRow = Math.floor(Math.random() * (numRows / 2)) * 2 + 1;
  const startCol = Math.floor(Math.random() * (numCols / 2)) * 2 + 1;

  grid[startRow][startCol].isWall = false;
  setGrid([...grid]);
  await sleep(delay);

  const addWalls = (r, c) => {
    const directions = [[0, -2], [-2, 0], [0, 2], [2, 0]];
    for (let [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (isInBounds(nr, nc) && grid[nr][nc].isWall) {
        walls.push([r + dr / 2, c + dc / 2, nr, nc]); // (wallRow, wallCol, cellRow, cellCol)
      }
    }
  };

  addWalls(startRow, startCol);

  while (walls.length) {
    const randIdx = Math.floor(Math.random() * walls.length);
    const [wallRow, wallCol, cellRow, cellCol] = walls.splice(randIdx, 1)[0];

    if (grid[cellRow][cellCol].isWall) {
      grid[wallRow][wallCol].isWall = false;
      grid[cellRow][cellCol].isWall = false;
      setGrid([...grid]);
      await sleep(delay);
      addWalls(cellRow, cellCol);
    }
  }
}
