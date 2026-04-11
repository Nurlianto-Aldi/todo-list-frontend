import { Form } from "react-router-dom";

function InputNewTask({ handleAddTask, isAddingTask, userInput, handleOnChangeInput }) {
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if (!isAddingTask) {
      handleAddTask();
    }
  }
  
  return (
    <form
      onSubmit={onSubmitForm}
      className="flex w-full max-w-xl items-center justify-center"
    >
      <input
        type="text"
        onChange={(e) => handleOnChangeInput(e.target.value)}
        value={userInput}
        placeholder="Add new task in here..."
        className="bg-[#2C2824] text-[#DCC9A9] placeholder-[#DCC9A9]/40 py-2 px-4 rounded-l-md border border-[#DCC9A9]/20 focus:border-[#4E6851] outline-none w-4/6 sm:w-4/5 text-sm sm:text-base transition-colors disabled:opacity-50"
        required
        disabled={isAddingTask}
      />
      <button
        type="submit"
        disabled={isAddingTask}
        className={`py-2 px-4 rounded-r-md w-2/6 sm:w-1/5 text-sm sm:text-base font-bold transition-all duration-200
          ${
            isAddingTask ?
            "bg-[#4E6851]/50 text-[#DCC9A9]/50 cursor-not-allowed" 
            :
            "bg-[#4E6851] hover:bg-[#3A4E3D] text-[#1C1A17] active:scale-95"
          }`
        }
      >
        {isAddingTask ? "Adding..." : "Add Task"}
      </button>
      
      
    </form>
  )
}

export default InputNewTask;