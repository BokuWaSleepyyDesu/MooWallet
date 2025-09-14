import React, { useState } from "react";
import type { AuthView } from "./AuthPage";
const API_URL = import.meta.env.VITE_API_URL;

export default function Login({ switchView }: { switchView: (v: AuthView) => void }) {
  const[identifier, setIdentifier] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (identifier.length < 9) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try{
      const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        identifier: identifier, 
        password: password
      }),
    });

     const data = await response.json();

    if (!response.ok) {
      setError(data.detail || "Invalid email or password");
      return;
    }

    console.log("Login success:", data);
    // redirect to dashboard
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    
    console.log("Logging in with:", { identifier, password });
  };

  return (
    <div>
      <button className="absolute top-[18%] left-[64%] border-0 bg-transparent text-[#1c1c1c] cursor-pointer hover:text-[#4b4b4b] transition-colors text-[100%]" onClick={() => switchView("signup")} type="button">Create Account &gt;</button>
      <form onSubmit={handleSubmit} className="block">
        <div className="flex items-center justify-center">
          <img className="w-[6.18%] h-[3.92%]" src="/images/mail_icon.png" alt="mail_icon" />
          <div className="ml-[3.5%]">
            <input type="email" placeholder="Email or Phone Number" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-pointer text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[5%]">
          <img className="w-[6.18%] h-[3.92%]" src="/images/password_icon.png" alt="mail_icon" />
          <div className="ml-[3.5%]">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-pointer text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        <div className="mt-[-1%] ml-[17.5%]">
          {error && <p className="text-[#ec1c24] text-sm mb-[-5%]">{error}</p>}
        </div>
        <div className="mt-[5.5%] ml-[17.5%]">
          <button type="submit" className="w-[28.54%] py-[2.53%] border-0 rounded-[10px] bg-[#4b4b4b] text-[#fff9e6] text-[100%] cursor-pointer">MOOve in</button>
        </div>
        <div className="mt-[3%] ml-[17.5%]">
          <button className="absolute border-0 bg-transparent text-[#1c1c1c] cursor-pointer hover:text-[#4b4b4b] transition-colors text-[100%]" onClick={() => switchView("forgot")} type="button">Forgot Password?</button>
        </div>
      </form>
    </div>
  );
}
