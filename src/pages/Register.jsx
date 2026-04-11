import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
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
        alert("Account Created")
        navigate("/login")
      } else {
        alert(data.message)
      }

    } catch (err) {
      console.error("Failed to connect to server:", err)
    } finally {
      setIsLoading(false)
    }
  }
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
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
          className={`text-white p-2 rounded font-bold ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div>
        <p>
          Already have an account? Please{" "}
          <Link to="/login" className="text-blue-600 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register;