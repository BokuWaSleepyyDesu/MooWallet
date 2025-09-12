// src/pages/Dashboard/DashboardLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
// import Header from "../../components/Header";
// import Sidebar from "../../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <h1>HIII</h1>
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
