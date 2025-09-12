import type { AuthView } from "./AuthPage";

export default function ForgotPassword({ switchView }: { switchView: (v: AuthView) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send Email</button>
      </form>
      <div className="mt-4 text-sm text-center">
        <button className="text-blue-600" onClick={() => switchView("login")}>
          Login
        </button>{" "}
        |{" "}
        <button className="text-blue-600" onClick={() => switchView("forgot")}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
