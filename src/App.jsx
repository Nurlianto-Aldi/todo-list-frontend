import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
