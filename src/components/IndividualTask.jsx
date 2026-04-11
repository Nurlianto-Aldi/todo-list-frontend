import { MdEdit, MdDelete } from "react-icons/md";

function IndividualTask({ task, handleTaskComplete, handleEditTaskButton, handleDeleteButton }) {
  
  return (
    <div
      className={`flex py-1 px-2.5 sm:py-2.5 sm:px-5 gap-5 rounded-md w-full max-w-xl h-full items-center justify-center text-xl transition-all duration-200 border ${
        task.isCompleted 
          ? "bg-[#1C1A17] border-[#DCC9A9]/10" 
          : "bg-[#2C2824] hover:bg-[#36322D] border-[#DCC9A9]/20 hover:border-[#4E6851]/50"
      }`}
    >
      
      {/* Text */}
      <div className="flex items-center justify-start w-7/8 text-wrap">
        <span
          onClick={() => handleTaskComplete(task.id)}
          className={`cursor-pointer break-all text-sm sm:text-base transition-colors duration-200 ${
            task.isCompleted ? "text-[#DCC9A9]/40 line-through" : "text-[#DCC9A9]"
          }`}
        >
          {task.task}
        </span>
      </div>
      
      {/* Edit and Delete Button*/}
      <div className="flex items-center justify-between gap-2.5 w-1/8">
        <MdEdit
          onClick={() => {
            if (!task.isCompleted) handleEditTaskButton(task.id, task.task)
          }}
          className={`transition-colors ${
            task.isCompleted 
              ? "text-[#DCC9A9]/20 cursor-not-allowed" 
              : "text-[#4E6851] hover:text-[#DCC9A9] cursor-pointer"
          }`}
        />
        <MdDelete
          onClick={() => handleDeleteButton(task.id)}
          className="cursor-pointer text-[#B83A2D] hover:text-[#8C2C22] transition-colors"
        />
      </div>
      
    </div>
  )
}

export default IndividualTask;