
import React, { useState } from "react";
import { signIn } from "../api/auth_api";
import {Link, useNavigate} from 'react-router-dom';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
  
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      try {
        await signIn(email, password);
        console.log("successed Sign in ")
        navigate("/mainpage")
      } catch (err: any) {
        setError(err.response.data.message || "An error occurred");
      }
    };
  
    return (
        <div className="flex justify-center items-center h-screen w-full bg-neutral-950">
          <form onSubmit={handleSignIn} className="bg-neutral-900 p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
            {error && <p className="text-red-500">{error}</p>}
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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Sign In
            </button>
            <p className="text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      );
  };
  
  export default SignIn;
