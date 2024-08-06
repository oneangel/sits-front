import {
  IconHomeDown,
  IconLayoutDashboardFilled,
  IconMenu2,
  IconUsers,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";

type SidebarProps = {
  setActiveSection: (
    section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  ) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  // Estado para rastrear la sección activa
  const [activeSection, setActive] = useState<
    "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  >("Resumen");

  // Estado para controlar la visibilidad del sidebar
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Función para manejar el cambio de sección y cerrar el sidebar
  const handleSectionClick = (
    section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  ) => {
    setActive(section);
    setActiveSection(section);

    // Cierra el sidebar en dispositivos móviles
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setSidebarVisible(false);
    }
  };

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed px-3 w-64 inset-0 md:relative md:translate-x-0 transition-transform transform bg-white z-50 md:z-auto border-r-2 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="m-4 text-lg text-zinc-500">Tableros</h1>
        <ul className="mt-4">
          <li
            className={`flex items-center px-6 py-3 text-lg transition cursor-pointer rounded-xl hover:scale-105 ${
              activeSection === "Resumen"
                ? "bg-gray-200 hover:bg-gray-300"
                : "hover:text-yellow-500"
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
              activeSection === "Beneficios"
                ? "bg-gray-200 hover:bg-gray-300"
                : "hover:text-yellow-500"
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
              activeSection === "Beneficiarios"
                ? "bg-gray-200 hover:bg-gray-300"
                : "hover:text-yellow-500"
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
              activeSection === "Usuarios"
                ? "bg-gray-200 hover:bg-gray-300"
                : "hover:text-yellow-500"
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

      {/* Overlay para resoluciones pequeñas */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Botón para alternar el sidebar */}
      <div className="fixed z-50 bottom-4 right-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-yellow-500 rounded-full shadow-lg"
        >
          {isSidebarVisible ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
