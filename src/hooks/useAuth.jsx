import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const syncLocalTasksToDatabase = async (token) => {
    const guestTasks = JSON.parse(localStorage.getItem("guest_tasks") || "[]");
    
    if (guestTasks.length === 0) return;

    try {
      for (const item of guestTasks) {
        await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ task: item.task })
        });
      }
      
      localStorage.removeItem("guest_tasks");
      localStorage.removeItem("isGuest");
      console.log("Guest data synchronization success!");
    } catch (err) {
      console.error("Failed to synchronize guest task:", err);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        await syncLocalTasksToDatabase(data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("There is a connection problem. Please try again.");
      console.error("Failed to connect to server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Account Created. Please Sign In.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("There is a connection problem. Please try again.");
      console.error("Failed to connect to server:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const continueAsGuest = () => {
    localStorage.setItem("isGuest", "true");
    navigate("/");
  };

  return {
    isLoading,
    login,
    register,
    logout,
    continueAsGuest
  };
}