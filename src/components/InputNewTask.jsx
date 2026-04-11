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
        className="bg-white text-black placeholder-gray-300 py-1 px-2.5 sm:py-2.5 sm:px-5 rounded-l-md border-none outline-none w-4/6 sm:w-4/5 text-sm sm:text-base"
        required
        disabled={isAddingTask}
      />
      <button
        type="submit"
        disabled={isAddingTask}
        className={`py-1 px-2.5 sm:py-2.5 sm:px-5 rounded-r-md w-2/6 sm:w-1/5 text-sm sm:text-base transition-colors duration-200 
          ${ isAddingTask ?
            "bg-gray-500 cursor-not-allowed text-gray-300"
            :
            "bg-blue-900 hover:bg-blue-700 text-white"
          }`
        }
      >
        {isAddingTask ? "Adding..." : "Add Task"}
      </button>
      
      
    </form>
  )
}

export default InputNewTask;