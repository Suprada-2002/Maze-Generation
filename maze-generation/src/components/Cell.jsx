const Cell = ({ isWall, isVisited, isStart, isEnd }) => {
  let className = "w-[20px] h-[20px] border border-gray-700 transition-colors duration-100";

  if (isStart) {
    className += " bg-red-500";
  } else if (isEnd) {
    className += " bg-green-500";
  } else if (isVisited) {
    className += " bg-purple-500";  // VISITED color
  } else if (isWall) {
    className += " bg-black";
  } else {
    className += " bg-white";
  }

  return <td className={className}></td>;
};

export default Cell;