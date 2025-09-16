import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import ServiceSidebar from "../../components/ServiceSidebar";
import Home from "./Home";
import BalanceSidebar from "../../components/BalanceSidebar";

export default function HomeLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 gap-[2%] p-4 overflow-hidden mt-[2%]">
        <ServiceSidebar />
        <Home />
        <BalanceSidebar />
      </div>
    </div>
  );
}
