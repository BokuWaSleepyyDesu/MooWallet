import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/Auth/AuthPage";
import HomePage from "./pages/Dashboard/HomePage";
// import Home from "./pages/Dashboard/Home";
// import Services from "./pages/Dashboard/Services";
// import Wallet from "./pages/Dashboard/Wallet";
// import Account from "./pages/Dashboard/Account";
// import Statements from "./pages/Dashboard/Statements";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Auth pages */}
                    <Route path = "/auth/*" element = {<AuthPage />} />

                    {/* Dashboard pages */}
                    <Route path = "/dashboard/*" element = { <HomePage />} >
                        {/* <Route index element = {<Home />} />
                        <Route path = "services" element = {<Services />} />
                        <Route path = "wallet" element = {<Wallet />} />
                        <Route path = "account" element = {<Account />} />
                        <Route path = "statements" element = {<Statements />} /> */}
                    </Route>

                    {/* Default redirect */}
                    <Route path = "*" element = {<Navigate to = "/auth" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;