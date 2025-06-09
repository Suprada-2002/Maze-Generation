const Cell = ({ isWall, isVisited, isStart, isEnd }) => {
  let className =
    "w-[24px] h-[24px] border border-gray-700 transition-colors duration-300 rounded-sm shadow-md";

  if (isStart) {
    className +=
      " bg-gradient-to-br from-red-400 to-red-600 shadow-red-600/70";
  } else if (isEnd) {
    className +=
      " bg-gradient-to-br from-green-400 to-green-600 shadow-green-600/70";
  } else if (isVisited) {
    className +=
      " bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-600/70";
  } else if (isWall) {
    className += " bg-gray-900";
  } else {
    className += " bg-gray-100";
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
