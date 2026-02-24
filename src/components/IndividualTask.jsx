import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";



function IndividualTask({ task, handleTaskComplete, handleEditTaskButton, handleDeleteButton }) {
  
  return (
    <div
      className="flex bg-blue-900 py-2.5 px-5 gap-5 rounded-md w-full max-w-xl h-full items-center justify-center text-xl"
    >
      
      {/* Text */}
      <div
        className="flex items-center justify-start w-7/8 text-wrap"
      >
        <span
          onClick={() => handleTaskComplete(task.id)}
          className={`cursor-pointer break-all ${task.isCompleted === true ? "line-through" : ""}`}
        >
          {task.task}
        </span>
      </div>
      
      {/* Edit and Delete Button*/}
      <div
        className="flex items-center justify-between gap-2.5 w-1/8"
      >
        <MdEdit
          onClick={() => {handleEditTaskButton(task.id, task.task)}}
          className="cursor-pointer"
        />
        <MdDelete
          onClick={() => handleDeleteButton(task.id)}
          className="cursor-pointer"
        />
      </div>
      
    </div>
  )
}

export default IndividualTask;