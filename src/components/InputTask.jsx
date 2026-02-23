function InputTask({ userInput, onChange, handleAddTask }) {
  
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }
  
  return (
    <div>
        <input 
          type="text"
          value={userInput}
          onChange={onChange}
          onKeyDown={keyHandler}
          placeholder="Add new task here..." 
          className="border-0 bg-white text-black placeholder-gray-300 outline-none rounded-bl-md rounded-tl-md px-2.5 py-1"
        />
        <button
          onClick={handleAddTask}
          className="border-0 bg-[#435663] rounded-br-md rounded-tr-md px-2.5 py-1 cursor-pointer hover:bg-[#859199]"
        >
          Add Task
        </button>
    </div>
  )
}

export default InputTask;