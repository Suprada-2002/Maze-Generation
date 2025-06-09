export async function generateKruskalsMaze(grid, setGrid, delay = 20) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const isInBounds = (r, c) => r >= 0 && r < numRows && c >= 0 && c < numCols;

  const getCellId = (row, col) => row * numCols + col;

  const parent = new Map();
  const find = (node) => {
    if (parent.get(node) !== node) {
      parent.set(node, find(parent.get(node)));
    }
    return parent.get(node);
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent.set(rootB, rootA);
  };

  const walls = [];

  // Initialize cells and sets
  for (let r = 0; r < numRows; r += 2) {
    for (let c = 0; c < numCols; c += 2) {
      grid[r][c].isWall = false;
      const id = getCellId(r, c);
      parent.set(id, id);

      // Add horizontal and vertical walls
      const directions = [
        [0, 2], // right
        [2, 0], // down
      ];
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (isInBounds(nr, nc)) {
          walls.push([r + dr / 2, c + dc / 2, r, c, nr, nc]); // wall row/col, cell1, cell2
        }
      }
    }
  }

  // Shuffle walls
  for (let i = walls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }

  for (const [wallRow, wallCol, cell1Row, cell1Col, cell2Row, cell2Col] of walls) {
    const id1 = getCellId(cell1Row, cell1Col);
    const id2 = getCellId(cell2Row, cell2Col);

    if (find(id1) !== find(id2)) {
      grid[wallRow][wallCol].isWall = false;
      union(id1, id2);
      setGrid([...grid]);
      await sleep(delay);
    }
  }
}
