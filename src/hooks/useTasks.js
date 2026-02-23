import { useState, useEffect } from 'react';

export function useTasks() {
  const [taskList, setTaskList] = useState(() => {
    const loadedTask = JSON.parse(localStorage.getItem("taskList"))
    return loadedTask || [];
  })
  
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }), [taskList]
  
  const [userInput, setUserInput] = useState("")
  
  const handleAddTask = () => {
    if (!userInput.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: userInput,
      isCompleted: false
    };
    
    setTaskList([...taskList, newTask]);
    setUserInput("");
  }
  
  const handleDeleteTask = (taskId) => {
    const updatedTask = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTask);
  }
  
  const handleCompletedTask = (taskId) => {
    const updatedTask = taskList.map((task) => (
      task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task
    ))
    
    const sortedTask = updatedTask.sort((a, b) => a.isCompleted - b.isCompleted);
    
    setTaskList(sortedTask);
  }
  
  const handleEditTask = (newText, taskId) => {
    if (newText.trim() === "") {
      // alert("New text can't be empty!")
      return false;
    }
    
    const updatedTask = taskList.map((task) => (
      task.id === taskId ? {...task, text: newText} : task
    ))
    setTaskList(updatedTask);
    return true;
  }
  
  return {
    taskList,
    handleAddTask,
    handleDeleteTask,
    handleCompletedTask,
    handleEditTask,
    userInput,
    setUserInput
  }
}