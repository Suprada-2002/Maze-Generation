function Legend() {
    return(
        <div className="flex gap-5 py-3 justify-center items-center">
            <div className="flex gap-1 text-sm"><span className="block w-[20px] h-[20px] bg-black rounded-sm"></span>Wall</div>
            <div className="flex gap-1 text-sm"><span className="block w-[20px] h-[20px] bg-red-500 rounded-sm"></span>Start Cell</div>
            <div className="flex gap-1 text-sm"><span className="block w-[20px] h-[20px] bg-green-500 rounded-sm"></span>End Cell</div>
            <div className="flex gap-1 text-sm"><span className="block w-[20px] h-[20px] bg-purple-400 rounded-sm"></span>Visited cell</div>
            <div className="flex gap-1 text-sm"><span className="block w-[20px] h-[20px] bg-blue-500 rounded-sm"></span>Maze completed</div>
        </div>
    )
}

export default Legend;
