import { useState } from "react";
import type { AuthView } from "./AuthPage";
const API_URL = import.meta.env.VITE_API_URL;

export default function ForgotPassword({ switchView }: { switchView: (v: AuthView) => void }) {
  const[identifier, setIdentifier] = useState("");
  const[password, setPassword] = useState("");
  const[otp, setOTP] = useState("");
  const[error, setError] = useState("");
  const[otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/request-password-recovery-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to send OTP");
        return;
      }

      console.log("OTP sent:", data);
      setOtpSent(true);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setError("");

    try{
      const response = await fetch(`${API_URL}/password-recovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          identifier: identifier,
          otp: otp,
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to change password");
      }

      console.log("Password Changed Successfully!: ", data);
      switchView("login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <button className="absolute top-[17%] left-[5%] border-0 bg-transparent text-[#1c1c1c] cursor-pointer hover:text-[#4b4b4b] transition-colors text-[100%]" onClick={() => switchView("login")} type="button">&lt; Go back</button>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <img className="w-[6.18%] h-[3.92%]" src="/images/mail_icon.png" alt="mail_icon" />
          <div className="ml-[3.5%]">
            <input type="text" placeholder="Email or Phone Number" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        {otpSent &&
        <div className="flex items-center justify-center mt-[1.5%]">
          <p>OTP: </p>
          <div className="ml-[3.5%]">
            <input type="text" placeholder="Enter OTP Code" value={otp} onChange={(e) => setOTP(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        }
        {otpSent && 
        <div id="password" className="flex items-center justify-center mt-[1.5%]">
          <img className="w-[6.18%] h-[3.92%]" src="/images/password_icon.png" alt="mail_icon" />
          <div className="ml-[3.5%]">
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="ml-[2%] w-full border-0 focus:outline-none transparent text-[#1c1c1c] cursor-text text-[0.9rem]" />
            <svg className="block mt-[2%]" width="100%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
          </div>
        </div>
        }
        <div className="mt-[-1%] ml-[17.5%]">
          {error && <p className="text-[#ec1c24] text-sm mb-[-5%]">{error}</p>}
        </div>
        {!otpSent &&
        <div id="otpSendButton" className="mt-[5.5%] ml-[17.5%]">
          <button type="button" onClick={handleSendOtp} className="w-[28.54%] py-[2.53%] border-0 rounded-[10px] bg-[#4b4b4b] text-[#fff9e6] text-[100%] cursor-pointer">Send OTP</button>
        </div>
        }
        {otpSent &&
        <div id="recoverButton" className="mt-[5.5%] ml-[17.5%]">
          <button type="submit" className="w-[40%] py-[2.53%] border-0 rounded-[10px] bg-[#4b4b4b] text-[#fff9e6] text-[100%] cursor-pointer">Change Password</button>
        </div>
        }
      </form>
    </div>
  );
}
