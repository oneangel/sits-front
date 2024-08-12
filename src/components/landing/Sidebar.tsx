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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Sidebar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleSectionClick = (
    section: "Resumen" | "Categorias" | "Usuarios"
  ) => {
    switch (section) {
      case "Resumen":
        navigate("/overview");
        break;
      case "Categorias":
        navigate("/overview/categorias");
        break;
      case "Usuarios":
        navigate("/overview/usuarios");
        break;
    }

    // Cierra el sidebar en dispositivos móviles
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setSidebarVisible(false);
    }
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // Asegúrate de tener 'navigate' disponible en este componente
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const sections = [
    { name: "Resumen", icon: <IconLayoutDashboardFilled />, path: "/overview" },
    {
      name: "Categorias",
      icon: <IconHomeDown />,
      path: "/overview/categorias",
    },
    { name: "Usuarios", icon: <IconUsersGroup />, path: "/overview/usuarios" },
  ];

  // Filtrar las secciones basadas en el estado del usuario
  const userSections = sections.filter(
    (section) => !(section.name === "Usuarios" && user.status === "commun")
  );

  return (
    <div className="flex">
      <div
        className={`fixed flex flex-col justify-between px-3 w-64 inset-0 md:relative md:translate-x-0 transition-transform transform bg-white z-50 md:z-auto border-r-2 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="m-4 text-lg font-bold">
          Bienvenido, <span className="">{user.nombre}!</span>
        </h1>
        <hr />
        <div>
          <h1 className="m-4 mt-10 text-lg text-zinc-500">Tableros</h1>
          <ul className="mt-4">
            {userSections.slice(0, 2).map((section) => (
              <li
                key={section.name}
                className={`flex items-center px-6 py-3 text-xl transition cursor-pointer rounded-xl hover:scale-105 ${
                  location.pathname === section.path
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

          {user.status !== "commun" && (
            <h1 className="m-4 mt-8 text-lg text-zinc-500">Administrador</h1>
          )}
          <ul className="mt-4">
            {userSections.slice(2).map((section) => (
              <li
                key={section.name}
                className={`flex items-center px-6 py-3 text-xl transition cursor-pointer rounded-xl hover:scale-105 ${
                  location.pathname === section.path
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
          <button
            onClick={handleLogout}
            className="flex gap-2 mb-10 -ml-16 transition px- text-destructive hover:scale-105 hover:text-red-700 hover:font-semibold"
          >
            <span>
              <IconLogout2 />
            </span>
            Cerrar Sesión
          </button>
          <img src={sits} alt="SITS Logo" className="h-36" />
        </div>
      </div>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

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
