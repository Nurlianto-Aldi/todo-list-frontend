import Title from "../components/Title"
import InputNewTask from "../components/InputNewTask"
import TaskList from "../components/TaskList"
import { useTasks } from "../hooks/useTasks"
import { useNavigate } from "react-router-dom"

function TodoList() {

  const {
    taskList,
    userInput,
    newInput,
    handleAddTask,
    isAddingTask,
    handleOnChangeInput,
    handleTaskComplete,
    taskId,
    handleEditTaskButton,
    handleSaveEdit,
    handleSaveEditButton,
    handleCancelEditButton,
    handleDeleteButton,
    isFetchingTasks
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
        isAddingTask={isAddingTask}
        handleOnChangeInput={handleOnChangeInput}
      />
      
      {/* Task List */}
      {isFetchingTasks ? (
        <div className="w-full max-w-xl flex justify-center py-10">
          <p className="text-white text-lg animate-pulse font-semibold">
            Loading your tasks...
          </p>
        </div>
      ): (
        <TaskList
          taskList={taskList}
          handleTaskComplete={handleTaskComplete}
          taskId={taskId}
          handleEditTaskButton={handleEditTaskButton}
          userInput={userInput}
          newInput={newInput}
          handleSaveEdit={handleSaveEdit}
          handleSaveEditButton={handleSaveEditButton}
          handleCancelEditButton={handleCancelEditButton}
          handleDeleteButton={handleDeleteButton}
          isFetchingTasks={isFetchingTasks}
        />
      )}
      
      {/* Log Out Button*/}
      <div
        className="w-ful max-w-md flex justify-end mb-1"
      >
        <button
          onClick={handleLogout}
          className="bg-[#B83A2D] hover:bg-[#8C2C22] text-[#DCC9A9] font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95"
        >
          Log Out
        </button>
      </div>
      
    </div>
  )
}

export default TodoList;