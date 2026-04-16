import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {
    login,
    isLoading,
    continueAsGuest
  } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password)
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
          className="border bg-[#2C2824] border-[#DCC9A9]/20 focus:border-[#4E6851] p-2 rounded focus:outline-none placeholder-[#DCC9A9]/40 text-[#DCC9A9] transition-colors"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border bg-[#2C2824] border-[#DCC9A9]/20 focus:border-[#4E6851] p-2 rounded focus:outline-none placeholder-[#DCC9A9]/40 text-[#DCC9A9] transition-colors"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`text-white p-2 rounded font-bold transition-colors
            ${
              isLoading ?
              "bg-[#4E6851]/50 text-[#DCC9A9]/50 cursor-not-allowed"
              :
              "bg-[#4E6851] hover:bg-[#3A4E3D] text-[#1C1A17] active:scale-95"
            }`
          }
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div
        className="mt-4"
      >
        <p>
          Don't have an account yet? Please{" "}
          <Link to="/register" className="text-[#4E6851] hover:text-[#DCC9A9] transition-colors font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
      <div
        className="mt-2"
      >
        <p>
          or{" "}
          <button
            type="button"
            onClick={continueAsGuest}
            className="text-[#4E6851] hover:text-[#DCC9A9] transition-colors font-semibold cursor-pointer"
          >
            Continue as Guest
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login;