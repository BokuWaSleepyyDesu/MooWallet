import type { AuthView } from "./AuthPage";

export default function Login({ switchView }: { switchView: (v: AuthView) => void }) {
  return (
    <div>
      <button className="absolute top-[18%] left-[66.18%] border-0 bg-transparent text-[#1c1c1c] cursor-pointer hover:text-[#4b4b4b] transition-colors" onClick={() => switchView("forgot")} type="button">Create Account &gt;</button>
      <form className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
      <div className="mt-4 text-sm text-center">
        <button className="text-blue-600" onClick={() => switchView("signup")}>
          Create Account
        </button>{" "}
        |{" "}
        <button className="text-blue-600" onClick={() => switchView("forgot")}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
