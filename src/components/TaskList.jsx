import IndividualTask from "./IndividualTask";
import EditIndividualTask from "./EditIndividualTask";

function TaskList({ taskList, handleTaskComplete, taskId, handleEditTaskButton, handleSaveEdit, handleSaveEditButton, handleCancelEditButton, handleDeleteButton }) {
  
  return (
    <div
      className="flex flex-col gap-2.5 w-full max-w-xl"
    >
      {taskList.map(task => (
        <li
          key={task.id}
          className="list-none"
        >
          {task.id !== taskId ? (
            <IndividualTask
              task={task}
              handleTaskComplete={handleTaskComplete}
              handleEditTaskButton={handleEditTaskButton}
              handleDeleteButton={handleDeleteButton}
            />
          ): (
            <EditIndividualTask
              task={task.task}
              handleSaveEdit={handleSaveEdit}
              handleSaveEditButton={handleSaveEditButton}
              handleCancelEditButton={handleCancelEditButton}
            />
          )}
        </li>
      ))}
    </div>
  )
}

export default TaskList;