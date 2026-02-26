import { useEffect, useState } from "react"
  
export function useTasks() {
  
  const [taskList, setTaskList] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [userInput, setUserInput] = useState("");
  const [newInput, setNewInput] = useState("")
  
  const fetchTask = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch all task")
      }
    
      const result = await response.json()
      const dataFromBE = result.data
      const sortedData = dataFromBE.sort((a, b) => a.isCompleted - b.isCompleted)
      
      setTaskList(sortedData)
      
    } catch (err) {
      console.error("WARNING! There is an error:", err)
    }
  }
  
  useEffect(() => {
    fetchTask();
  }, [])
  
  
  const handleOnChangeInput = (input) => {
    setUserInput(input)
  }
  
  const handleAddTask = async () => {
    try {
      if (!userInput.trim()) {
        alert("Task can't be empty")
        return;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task: userInput
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to add new task to database")
      }
      
      fetchTask()
      setUserInput("")

    } catch (err) {
      console.error("WARNING! There is an error:", err)
    }
  }
  
  
  const handleTaskComplete = async (taskId) => {
    try {
      const targetTask = taskList.find((task) => task.id === taskId);
      const newStatus = !targetTask.isCompleted;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isCompleted: newStatus
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to change complete status at database")
      }
      
      fetchTask()
      
    } catch (err) {
      console.error("WARNING! There is an error:", err)
    }
  }
  
  const handleEditTaskButton = (taskId, currentText) => {
    const targetTask = taskList.find(task => task.id === taskId)
    
    if (targetTask.isCompleted) {
      alert("Can't edit completed task!")
      return false
    }
    
    setTaskId(taskId)
    setNewInput(currentText);
  }
  
  const handleSaveEdit = (newInput) => {
    setNewInput(newInput)
  }
  
  const handleSaveEditButton = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task: newInput
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to update task for task with this id:", taskId)
      }
      
      fetchTask()
      setTaskId("")
      setNewInput("")
    } catch (err) {
      console.error("WARNING! There is an error:", err)
    }
    
  }
  
  const handleCancelEditButton = () => {
    setNewInput("")
    setTaskId("")
  }
  
  const handleDeleteButton = async (taskId) => {
    try {
      const targetTask = taskList.find(task => task.id === taskId)
      
      if (targetTask.isCompleted) {
        alert("Can't delete completed task")
        return false
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete task from database")
      }
      
      await fetchTask()
      setTaskId("")
      
    } catch (err) {
      console.error("WARNING! There is an error:", err)
    }
    
    
  }
  
  return {
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
  };
}