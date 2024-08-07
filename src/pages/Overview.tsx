import Sidebar from "@/components/landing/Sidebar";
import { useState } from "react";
import Resumen from "./Resume";
import Categorias from "./Categorias";
import Admin from "./Admin";
import Navbar from "@/components/dashboard/Navbar";
const Overview = () => {
  const [activeSection, setActiveSection] = useState("Resumen");

  const renderSection = () => {
    switch (activeSection) {
      case "Resumen":
        return <Resumen />;
      case "Categorias":
        return <Categorias />;
      case "Usuarios":
        return <Admin />;
      default:
        return <Resumen />;
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-white">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1">
        <Navbar setActiveSection={setActiveSection}/>
        <div className="px-6">{renderSection()}</div>
      </div>
    </div>
  );
};

export default Overview;
