// Cell.js
const Cell = ({ row, col, isWall, isStart, isEnd, isVisited }) => {
  let className = "w-[20px] h-[20px] border border-gray-700 transition-colors duration-100";

  if (isStart) {
    className += " bg-red-500";
  } else if (isEnd) {
    className += " bg-green-500";
  } else if (isVisited) {
    className += " bg-purple-500";  // visited cell animation color
  } else if (isWall) {
    className += " bg-black";
  }else {
    className += " bg-blue-600"; // path cell
  }

  return <td id={`node-${row}-${col}`} className={className}></td>;
};

export default Cell;
