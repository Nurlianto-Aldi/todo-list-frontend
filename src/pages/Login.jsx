import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Berhasil")
        navigate("/")
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Gagal menyambung ke server:", error)
    }
      
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Login Dulu Bro</h2>    
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded text-black focus:outline-none placeholder-gray-600 text-white"
          required
        />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-2 rounded text-black focus:outline-none placeholder-gray-600 text-white"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">
            Masuk
          </button>
      </form>
    </div>
  )
}

export default Login;