import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/Auth/AuthPage";
import HomePage from "./pages/Dashboard/HomePage";

function DashboardRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a nice spinner
  }

  return user ? <HomePage /> : <Navigate to="/auth" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<DashboardRoute />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
