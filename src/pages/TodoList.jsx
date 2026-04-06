import Title from "../components/Title"
import InputNewTask from "../components/InputNewTask"
import TaskList from "../components/TaskList"
import { useTasks } from "../hooks/useTasks"
import { useNavigate } from "react-router-dom"

function TodoList() {

  const {
    taskList,
    userInput,
    handleAddTask,
    handleOnChangeInput,
    handleTaskComplete,
    taskId,
    handleEditTaskButton,
    handleSaveEdit,
    handleSaveEditButton,
    handleCancelEditButton,
    handleDeleteButton,
  } = useTasks()
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }
  
  return (
    <div
      className="flex flex-col items-center justify-start sm:justify-center w-full h-full min-h-screen min-w-screen gap-10 px-10 py-10"
    >
      
      {/* Title */}
      <Title />
      
      {/* New Task Input*/}
      <InputNewTask
        userInput={userInput}
        handleAddTask={handleAddTask}
        handleOnChangeInput={handleOnChangeInput}
      />
      
      {/* Task List */}
      <TaskList
        taskList={taskList}
        handleTaskComplete={handleTaskComplete}
        taskId={taskId}
        handleEditTaskButton={handleEditTaskButton}
        userInput={userInput}
        handleSaveEdit={handleSaveEdit}
        handleSaveEditButton={handleSaveEditButton}
        handleCancelEditButton={handleCancelEditButton}
        handleDeleteButton={handleDeleteButton}
      />
      
      {/* Log Out Button*/}
      <div
        className="w-ful max-w-md flex justify-end mb-1"
      >
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
      
    </div>
  )
}

export default TodoList;