import { TheTask } from "./TheTask"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

function TaskList({ theTasks, handleDeleteTask, handleCompletedTask, handleEditTask }) {
  
  const [taskId, setTaskId] = useState("");
  const [newText, setNewText] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditButton = (taskId, taskStatus) => {
    if (taskStatus) {
      alert("Can't edit completed status")
      return
    }
    setTaskId(taskId)
  }
  
  const handleSaveEdit = () => {
    const isSuccess = handleEditTask(newText, taskId);
    
    if (!isSuccess) {
      setErrorMsg("Teks tidak boleh kosong!")
      return;
    }
    
    setErrorMsg("")
    setTaskId("");
    setNewText("");
  }
  
  const handleCancelEdit = (taskText, taskId) => {
    setNewText(taskText)
    handleEditTask(newText, taskId)
    setTaskId("")
  }
  
  const handleCancelKey = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    }
    
    if (e.key === "Escape") {
      handleCancelEdit(newText, taskId)
    }
  }
  
  const handleDeleteButton = (taskStatus, taskId) => {
    if (taskStatus) {
      alert("Can't delete completed task!")
      return
    }
    
    handleDeleteTask(taskId)
  }
  
  return(
    <div
      className="flex flex-col gap-2"
    >
      <ul
        className="flex flex-col gap-2"
      >
        {theTasks.map((task) => (
          <li
            key={task.id}
            className=""
          >
            {task.id === taskId ? (
              <div
                className="flex flex-row justify-between items-center bg-[#234E94] hover:bg-[#3B82F6] rounded-md py-1 px-2.5"
              >
                <div>
                  <input
                    type="text"
                    autoFocus
                    onChange={(e) => {
                      setNewText(e.target.value);
                      setErrorMsg("");
                    }}
                    onBlur={() => handleCancelEdit(task.text, task.id)}
                    onKeyDown={(e) => handleCancelKey(e)}
                    placeholder={task.text}
                    className="bg-transparent outline-none text-white placeholder-gray-300"
                  />
                </div>
                <div>
                  <FaCheck
                    onClick={() => handleSaveEdit()}
                    className="cursor-pointer text-white"
                  />
                </div>
                {/* {errorMsg && (
                  <span className="text-red-400 text-xs text-left px-2">{errorMsg}</span>
                )}*/}
                
              </div>
            ) : (
              <div
                className="flex flex-row justify-between items-center bg-[#234E94] hover:bg-[#3B82F6] rounded-md py-1 px-2.5"
              >
                <div
                  onClick={() => handleCompletedTask(task.id)}
                  className={`cursor-pointer ${task.isCompleted ? "line-through" : ""}`}
                >
                  {task.text}
                </div>
                <div
                  className="flex justify-end gap-2"
                >
                  <MdEdit
                    onClick={() => handleEditButton(task.id, task.isCompleted)}
                    className="cursor-pointer"
                  />
                  <MdDelete
                    onClick={() => handleDeleteButton(task.isCompleted, task.id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )} 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList