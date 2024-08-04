import Sidebar from "@/components/landing/Sidebar";
import  { useState } from "react";
import Resumen from "./Resume";
import Beneficios from "./Beneficios";
import Beneficiarios from "./Beneficiarios";


const Overview = () => {
  const [activeSection, setActiveSection] = useState("Resumen");

  const renderSection = () => {
    switch (activeSection) {
      case "Resumen":
        return <Resumen />;
      case "Beneficios":
        return <Beneficios />;
      case "Beneficiarios":
        return <Beneficiarios />;
      default:
        return <Resumen />;
    }
  };

  return (
    <div className="flex min-h-screen text-gray-900 bg-white">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
};

export default Overview;
