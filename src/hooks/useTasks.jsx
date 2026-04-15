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
      alert("Your session is expired. Please log in.");
      localStorage.removeItem("token");
      navigate("/login");
      throw new Error("SESSION_EXPIRED");
    }
    
    return response;
  }
  
  const fetchTask = async () => {
    setIsFetchingTask(true)
    
    const token = localStorage.getItem("token");
    
    if (token) {
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
    } else {
      const savedGuestTasks = localStorage.getItem("guest_tasks");
      
      const parsedGuestTasks = savedGuestTasks ? JSON.parse(savedGuestTasks) : [];
      
      setTaskList(parsedGuestTasks);
      
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
    if (!userInput.trim()) {
      alert("Task can't be empty")
      return;
    }
    
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
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
    } else {
      const newGuestTask = {
        id: `guest-${Date.now()}`,
        task: userInput,
        isCompleted: false,
        createdAt: new Date().toISOString()
      };
      
      const currentTasks = JSON.parse(localStorage.getItem("guest_tasks") || "[]");
      const updatedTasks = [newGuestTask, ...currentTasks];
      
      localStorage.setItem("guest_tasks", JSON.stringify(updatedTasks));
      
      setTaskList(updatedTasks.sort((a, b) => a.isCompleted - b.isCompleted));
      setUserInput("")
    }
    
  }
  
  
  const handleTaskComplete = async (taskId) => {
    
    const token = localStorage.getItem("token");
    
    if (token) {
      const oldTaskList = [...taskList];
      
      const updatedTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted
          };
        }
        return task;
      });
      
      setTaskList(updatedTaskList.sort((a, b) => a.isCompleted - b.isCompleted));
      
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
        
        // fetchTask()
        
      } catch (err) {
        console.error("WARNING! Optimistic Update Failed:", err)
        alert("Problem with connection, failed to change. Revert to previous state.")
        
        setTaskList(oldTaskList);
      }
    } else {
      const updatedTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted
          };
        }
        return task;
      });
      
      const sortedUpdate = updatedTaskList.sort((a, b) => a.isCompleted - b.isCompleted)
      
      setTaskList(sortedUpdate);
      
      localStorage.setItem("guest_tasks", JSON.stringify(sortedUpdate))
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
    if (!newInput.trim()) {
      handleCancelEditButton();
      return;
    }
    
    const token = localStorage.getItem("token");
    
    if (token) {
      const oldTaskList = [...taskList];
      
      const updatedTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            task: newInput
          };
        }
        return task;
      })
      
      setTaskList(updatedTaskList);
      setTaskId("");
      setNewInput("");
      
      try {
        const response = await fetchWithAuth(`/tasks/${taskId}`, {
          method: "PATCH",
          body: JSON.stringify({ task: newInput })
          })
        
        if (!response.ok) {
          throw new Error("Failed to update task for task with this id:", taskId)
        }
        
        // fetchTask()
        setTaskId("")
        setNewInput("")
      } catch (err) {
        console.error("WARNING! Optimistic update failed:", err)
        alert("Problem with connection, failed to change. Revert to previous state.")
        
        setTaskList(oldTaskList);
      }  
    } else {
      const updatedTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            task: newInput
          };
        }
        return task;
      })
      
      setTaskList(updatedTaskList);
      setTaskId("");
      setNewInput("");
      
      localStorage.setItem("guest_tasks", JSON.stringify(updatedTaskList))
    }
  }
  
  const handleCancelEditButton = () => {
    setNewInput("")
    setTaskId("")
  }
  
  const handleDeleteButton = async (taskId) => {
    
    const token = localStorage.getItem("token");
    
    if (token) {
      const oldTaskList = [...taskList];
      
      const targetTask = taskList.find((task) => task.id === taskId)
      
      if (targetTask.isCompleted) {
        alert("Can't delete completed task")
        return false
      }
      
      const updateTaskList = taskList.filter((task) => task.id !== taskId)
      
      setTaskList(updateTaskList)
      
      setTaskId("")
      
      try {
        const response = await fetchWithAuth(`/tasks/${taskId}`, {
          method: "DELETE",
        })
              
        if (!response.ok) {
          throw new Error("Failed to delete task from database")
        }
      } catch (err) {
        console.error("WARNING! Optimistic update failed:", err)
        alert("Problem with connection, failed to change. Revert to previous state.")
        
        setTaskList(oldTaskList)
      }
    } else {
      const targetTask = taskList.find((task) => task.id === taskId)
      
      if (targetTask.isCompleted) {
        alert("Can't delete completed task")
        return false
      }
      
      const updatedTaskList = taskList.filter((task) => task.id !== taskId)
      
      setTaskList(updatedTaskList);
      setTaskId("");
      
      localStorage.setItem("guest_tasks", JSON.stringify(updatedTaskList));
    }
    
  }
  
  return {
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
  };
}