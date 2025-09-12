import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

export type AuthView = "login" | "signup" | "forgot";

export default function AuthPage() {
    const [view, setView] = useState<AuthView>("login");

    const renderForm = () => {
        switch (view) {
            case "signup":
                return <Signup switchView = {setView} />;
            
            case "forgot":
                return <ForgotPassword switchView = {setView} />;
            
            default:
                return <Login switchView = {setView} />;
        }
    };

    return <AuthLayout>{renderForm()}</AuthLayout>;
}