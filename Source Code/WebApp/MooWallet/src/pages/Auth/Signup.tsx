import React, { useState } from "react";
import type { AuthView } from "./AuthPage";
const API_URL = import.meta.env.VITE_API_URL;

export default function Signup({ switchView }: { switchView: (v: AuthView) => void }) {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[phoneNumber, setPhoneNumber] = useState("");
  const[dob, setDOB] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[otp, setOTP] = useState("");
  const[error, setError] = useState("");
  const [otpSent, setOTPSent] = useState(false);

  const handleSendOtp = async () => {
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/request-registration-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to send OTP");
        return;
      }

      console.log("OTP sent:", data);
      setOTPSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone_no: phoneNumber,
          dob: dob,
          email: email,
          password: password,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Sign up failed");
        return;
      }

      console.log("Signup successful:", data);
      switchView("login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <button className="absolute top-[17%] left-[5%] border-0 bg-transparent text-[#1c1c1c] cursor-pointer hover:text-[#4b4b4b] transition-colors text-[100%]" onClick={() => switchView("login")} type="button">&lt; Go back</button>
      <form onSubmit={handleSignUp} className="ml-[11.5%] mt-[20%]">
        <div className="flex justify-center items-center">
          <div className="">
            <p className="m-[0%] w-[70%]">First Name:</p>
            <input type="text" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="ml-[2%] border-0 focus:outline-none text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="70%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
          <div className="">
            <p className="m-[0%] w-[70%]">Last Name:</p>
            <input type="text" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} className="ml-[2%] border-0 focus:outline-none text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="70%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[5%]">
          <div className="">
            <p className="m-[0%] w-[70%]">Phone Number:</p>
            <input type="tel" placeholder="" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="ml-[2%] border-0 focus:outline-none text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="70%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
          <div className="">
            <p className="m-[0%] w-[70%]">DOB (in AD):</p>
            <input type="date" placeholder="" value={dob} onChange={(e) => setDOB(e.target.value)} className="ml-[2%] border-0 focus:outline-none text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="70%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        <div className="mt-[5%]">
          <p className="m-[0%] w-[70%]">Email:</p>
          <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-text text-[0.9rem]" />
          <svg className="block mt-[2%]" width="85%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
        </div>
        <div className="mt-[5%]">
          <p className="m-[0%] w-[70%]">Password:</p>
          <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-text text-[0.9rem]" />
          <svg className="block mt-[2%]" width="85%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
        </div>
        <div className="mt-[5%] flex">
          <div className="w-[35%]">
            <p className="m-[0%] w-[70%]">OTP:</p>
            <input type="tel" placeholder="" value={otp} onChange={(e) => setOTP(e.target.value)} className="ml-[2%] border-0 focus:outline-none text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
          <button type="button" onClick={handleSendOtp} className="ml-[10%] px-[5%] py-[2.53%] border-0 rounded-[10px] bg-[#4b4b4b] text-[#fff9e6] text-[75%] cursor-pointer">{otpSent ? "OTP Sent" : "Send OTP"}</button>
        </div>
        <div className="flex mt-[5.5%]">
          <button type="submit" className="w-[28.54%] py-[2.53%] border-0 rounded-[10px] bg-[#4b4b4b] text-[#fff9e6] text-[100%] cursor-pointer">Sign Up</button>
          {error && <p className="text-[#ec1c24] text-sm ml-[2%]">{error}</p>}
        </div>
      </form>
    </div>
  );
}
