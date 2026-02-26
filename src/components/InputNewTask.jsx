import { useState } from "react";

function InputNewTask({ handleAddTask, userInput, handleOnChangeInput }) {
  
  return (
    <div
      className="flex w-full max-w-xl items-center justify-center"
    >
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask()
          }
        }}
        onChange={(e) => handleOnChangeInput(e.target.value)}
        value={userInput}
        placeholder="Add new task in here..."
        className="bg-white text-black placeholder-gray-300 py-1 px-2.5 sm:py-2.5 sm:px-5 rounded-l-md border-none outline-none w-4/6 sm:w-4/5 text-sm sm:text-base"
      />
      <button
        onClick={() => handleAddTask()}
        className="bg-blue-900 hover:bg-blue-700 py-1 px-2.5 sm:py-2.5 sm:px-5 rounded-r-md w-2/6 sm:w-1/5 text-sm sm:text-base"
      >
        Add Task
      </button>
    </div>
  )
}

export default InputNewTask;