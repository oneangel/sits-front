import { IconHomeDown, IconLayoutDashboardFilled, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import React, { useState } from "react";

type SidebarProps = {
  setActiveSection: (
    section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  ) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  // Estado para rastrear la sección activa
  const [activeSection, setActive] = useState<"Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios">("Resumen");

  // Función para manejar el cambio de sección
  const handleSectionClick = (section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios") => {
    setActive(section);
    setActiveSection(section);
  };

  return (
    <div className="w-64 px-4 border-r-2">
      <h1 className="m-4 text-lg text-zinc-500">Tableros</h1>
      <ul className="mt-4">
        <li
          className={`flex items-center px-6 py-3 text-lg transition cursor-pointer rounded-xl hover:scale-105 ${
            activeSection === "Resumen" ? "bg-gray-200 hover:bg-gray-300" : "hover:text-yellow-500"
          }`}
          onClick={() => handleSectionClick("Resumen")}
        >
          <span className="mr-2">
            <IconLayoutDashboardFilled />
          </span>
          Resumen
        </li>
        <li
          className={`flex items-center px-6 py-3 text-lg transition cursor-pointer rounded-xl hover:scale-105 ${
            activeSection === "Beneficios" ? "bg-gray-200 hover:bg-gray-300" : "hover:text-yellow-500"
          }`}
          onClick={() => handleSectionClick("Beneficios")}
        >
          <span className="mr-2">
            <IconHomeDown />
          </span>
          Beneficios
        </li>
        <li
          className={`flex items-center px-6 py-3 text-lg transition cursor-pointer rounded-xl hover:scale-105 ${
            activeSection === "Beneficiarios" ? "bg-gray-200 hover:bg-gray-300" : "hover:text-yellow-500"
          }`}
          onClick={() => handleSectionClick("Beneficiarios")}
        >
          <span className="mr-2">
            <IconUsers />
          </span>
          Beneficiarios
        </li>
      </ul>

      <h1 className="m-4 mt-8 text-lg text-zinc-500">Administrador</h1>
      <ul className="mt-4">
        <li
          className={`flex items-center px-6 py-3 text-lg transition cursor-pointer rounded-xl hover:scale-105 ${
            activeSection === "Usuarios" ? "bg-gray-200 hover:bg-gray-300" : "hover:text-yellow-500"
          }`}
          onClick={() => handleSectionClick("Usuarios")}
        >
          <span className="mr-2">
            <IconUsersGroup />
          </span>
          Usuarios
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
