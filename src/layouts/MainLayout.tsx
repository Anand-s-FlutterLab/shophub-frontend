import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 overflow-hidden px-4 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
