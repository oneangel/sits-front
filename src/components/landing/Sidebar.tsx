import React from "react";

type SidebarProps = {
  setActiveSection: (section: "Resumen" | "Beneficios" | "Beneficiarios") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  return (
    <div className="w-64 shadow-md border-s-4">
      <ul className="py-4">
        <li
          className="px-6 py-3 cursor-pointer hover:bg-yellow-200"
          onClick={() => setActiveSection("Resumen")}
        >
          Resumen
        </li>
        <li
          className="px-6 py-3 cursor-pointer hover:bg-yellow-200"
          onClick={() => setActiveSection("Beneficios")}
        >
          Beneficios
        </li>
        <li
          className="px-6 py-3 cursor-pointer hover:bg-yellow-200"
          onClick={() => setActiveSection("Beneficiarios")}
        >
          Beneficiarios
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
