import './App.css'
import TaskList from './components/TaskList'
import InputTask from './components/InputTask'
import { useTasks } from './hooks/useTasks'

function App() {

  const {
    taskList,
    handleAddTask,
    handleDeleteTask,
    handleCompletedTask,
    handleEditTask,
    userInput,
    setUserInput
  } = useTasks();

  
  return (
    <div
      className='flex flex-col justify-center text-center gap-10'
    >
      <p>To-Do List App</p>
      <InputTask
        userInput={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        handleAddTask={handleAddTask}
      />
      <TaskList 
        theTasks={taskList}
        handleDeleteTask={handleDeleteTask}
        handleCompletedTask={handleCompletedTask}
        handleEditTask={handleEditTask}
      />
    </div>
  )
}

export default App
