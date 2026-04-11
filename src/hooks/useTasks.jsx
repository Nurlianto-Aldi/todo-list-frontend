import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
  
export function useTasks() {
  
  const [taskList, setTaskList] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [userInput, setUserInput] = useState("");
  const [newInput, setNewInput] = useState("")
  // loading state for new task
  const [isAddingTask, setIsAddingTask] = useState(false)
  // loading state for the task list
  const [isFetchingTasks, setIsFetchingTask] = useState(true)
  
  const navigate = useNavigate();
  
  const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");
    
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    };
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (response.status === 401 || response.status === 403) {
      alert("Your session is expired. Silahkan login kembali.");
      localStorage.removeItem("token");
      navigate("/login");
      throw new Error("SESSION_EXPIRED");
    }
    
    return response;
  }
  
  const fetchTask = async () => {
    setIsFetchingTask(true)
    try {
      const response = await fetchWithAuth("/tasks", { method: "GET" })
      
      if (!response.ok) {
        throw new Error("Failed to fetch all task:")
      }
    
      const result = await response.json()
      const dataFromBE = result.data
      const sortedData = dataFromBE.sort((a, b) => a.isCompleted - b.isCompleted)
      
      setTaskList(sortedData)
      
    } catch (err) {
      console.error("WARNING! There is an error:", err)
    } finally {
      setIsFetchingTask(false)
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
      
      setIsAddingTask(true);
      
      const response = await fetchWithAuth("/tasks", {
        method: "POST",
        body: JSON.stringify({ task: userInput })
      });
      
      if (!response.ok) {
        throw new Error("Failed to add new task to database")
      }
      
      await fetchTask()
      setUserInput("")

    } catch (err) {
      console.error("WARNING! There is an error:", err)
    } finally {
      setIsAddingTask(false)
    }
  }
  
  
  const handleTaskComplete = async (taskId) => {
    try {
      const targetTask = taskList.find((task) => task.id === taskId);
      const newStatus = !targetTask.isCompleted;
      
      const response = await fetchWithAuth(`/tasks/${taskId}/complete`, {
        method: "PATCH",
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
      
      const response = await fetchWithAuth(`/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ task: newInput })
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
      
      const response = await fetchWithAuth(`/tasks/${taskId}`, {
        method: "DELETE",
      })
            
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
  };
}