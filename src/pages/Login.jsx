import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
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
        navigate("/")
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan, coba lagi.")
      console.error("Gagal menyambung ke server:", error)
    } finally {
      setIsLoading(false)
    }
      
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Login</h2>    
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded focus:outline-none placeholder-gray-600 text-white"
          required
        />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-2 rounded focus:outline-none placeholder-gray-600 text-white"
            required
          />
        <button
          type="submit"
          disabled={isLoading}
          className={`text-white p-2 rounded font-bold transition-colors ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div>
        <p>
          Don't have an account yet? Please{" "}
          <Link to="/register" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;