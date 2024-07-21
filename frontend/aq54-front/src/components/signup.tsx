import React, { useState } from "react";
import { signUp } from "../api/auth_api"; 
import {Link, useNavigate} from "react-router-dom";


const SignUp: React.FC = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
  
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      setPasswordError("");
  
      try {
        await signUp(email, password);
        console.log("succesed sign up")
        navigate('/mainpage')
      } catch (err: any) {
        setError(err.response.data.message || "An error occurred");
        
      }
    };
  
    return (
        <div className="flex justify-center items-center h-screen w-full bg-neutral-950">
        <form onSubmit={handleSignUp} className="bg-neutral-900 p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded bg-neutral-900 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded bg-neutral-900 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded bg-neutral-900 text-white"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Sign Up
          </button>
          <p className="text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    );
  };
  
  export default SignUp;