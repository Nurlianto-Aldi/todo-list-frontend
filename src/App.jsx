import Title from "./components/Title"
import InputNewTask from "./components/InputNewTask"
import TaskList from "./components/TaskList"
import EditIndividualTask from "./components/EditIndividualTask"
import { useTasks } from "./hooks/useTasks"

function App() {

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
  
  return (
    <div
      className="flex flex-col items-center justify-start sm:justify-center w-full h-full min-h-screen min-w-screen gap-10 px-10 py-10"
    >
      <Title />
      <InputNewTask
        userInput={userInput}
        handleAddTask={handleAddTask}
        handleOnChangeInput={handleOnChangeInput}
      />
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
    </div>
  )
}

export default App
