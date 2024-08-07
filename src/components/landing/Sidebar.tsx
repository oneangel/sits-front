import {
  IconHomeDown,
  IconLayoutDashboardFilled,
  IconLogout2,
  IconMenu2,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";
import sits from "../../assets/images/sitshd.png";
import React, { useState } from "react";

type SidebarProps = {
  setActiveSection: (section: "Resumen" | "Categorias" | "Usuarios") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  // Estado para rastrear la sección activa
  const [activeSection, setActive] = useState<
    "Resumen" | "Categorias" | "Usuarios"
  >("Resumen");

  // Estado para controlar la visibilidad del sidebar
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Función para manejar el cambio de sección y cerrar el sidebar
  const handleSectionClick = (section: "Resumen" | "Categorias" | "Usuarios") => {
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

  const sections = [
    { name: "Resumen", icon: <IconLayoutDashboardFilled /> },
    { name: "Categorias", icon: <IconHomeDown /> },
    { name: "Usuarios", icon: <IconUsersGroup /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between px-3 w-64 inset-0 md:relative md:translate-x-0 transition-transform transform bg-white z-50 md:z-auto border-r-2 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <h1 className="m-4 text-lg text-zinc-500">Tableros</h1>
          <ul className="mt-4">
            {sections.slice(0, 2).map((section) => (
              <li
                key={section.name}
                className={`flex items-center px-6 py-3 text-xl transition cursor-pointer rounded-xl hover:scale-105 ${
                  activeSection === section.name
                    ? "bg-primary text-white hover:bg-yellow-500"
                    : "hover:text-yellow-500"
                }`}
                onClick={() => handleSectionClick(section.name as any)}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </li>
            ))}
          </ul>

          <h1 className="m-4 mt-8 text-lg text-zinc-500">Administrador</h1>
          <ul className="mt-4">
            {sections.slice(2).map((section) => (
              <li
                key={section.name}
                className={`flex items-center px-6 py-3 text-xl transition cursor-pointer rounded-xl hover:scale-105 ${
                  activeSection === section.name
                    ? "bg-primary text-white hover:bg-yellow-500"
                    : "hover:text-yellow-500"
                }`}
                onClick={() => handleSectionClick(section.name as any)}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center mt-auto mb-4">
          <button className="flex gap-2 mb-10 -ml-16 text-destructive"><span><IconLogout2 /></span>Cerrar Sesión</button>
          <img src={sits} alt="SITS Logo" className="h-36" />
        </div>
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
