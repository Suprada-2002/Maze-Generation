function Legend() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 my-4 px-4">
      {[
        { color: "bg-black", label: "Wall (Blocked Path)" },
        { color: "bg-red-500", label: "Start Cell (Maze Entry Point)" },
        { color: "bg-green-500", label: "End Cell (Maze Exit Point)" },
        { color: "bg-purple-400", label: "Visited Cell (Currently Explored)" },
        { color: "bg-white border border-gray-400", label: "Maze Completed Path" },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-white" title={label}>
          <span className={`${color} w-6 h-6 rounded-sm border`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
