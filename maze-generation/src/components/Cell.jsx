const Cell = ({ isWall, isVisited, isStart, isEnd }) => {
  let className =
    "w-[24px] h-[24px] border border-gray-700 transition-colors duration-300 rounded-sm";

  if (isStart) {
    className += " bg-red-600";        // Rich flat red
  } else if (isEnd) {
    className += " bg-green-600";      // Deep flat green
  } else if (isVisited) {
    className += " bg-purple-600";     // Muted purple
  } else if (isWall) {
    className += " bg-gray-900";       // Very dark gray for walls
  } else {
    className += " bg-gray-100";       // Light gray for paths
  }

  return (
    <td
      className={className}
      aria-label={
        isStart
          ? "Start Cell"
          : isEnd
          ? "End Cell"
          : isWall
          ? "Wall"
          : isVisited
          ? "Visited Cell"
          : "Path"
      }
      role="gridcell"
    />
  );
};

export default Cell;
