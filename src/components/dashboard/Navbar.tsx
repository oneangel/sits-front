"use client";

import * as React from "react";
import {
  IconHomeDown,
  IconLayoutDashboardFilled,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type CommandDashProps = {
  setActiveSection: (
    section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  ) => void;
};

export function Navbar({ setActiveSection }: CommandDashProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Función para manejar el clic en un CommandItem
  const handleItemClick = (
    section: "Resumen" | "Beneficios" | "Beneficiarios" | "Usuarios"
  ) => {
    setActiveSection(section);
    setOpen(false);
  };

  return (
    <nav className="flex items-center justify-end w-full px-10 bg-white border-b-2 h-14">
      <button onClick={() => setOpen(true)} className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
        <span className="hidden lg:inline-flex">Buscar acceso directo...</span>
        <span className="inline-flex lg:hidden">Buscar...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe para buscar..." />
        <CommandList>
          <CommandEmpty>Sin resultados encontrados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem onSelect={() => handleItemClick("Resumen")}>
              <IconLayoutDashboardFilled className="w-4 h-4 mr-2" />
              <span>Resumen</span>
            </CommandItem>
            <CommandItem onSelect={() => handleItemClick("Beneficios")}>
              <IconHomeDown className="w-4 h-4 mr-2" />
              <span>Beneficios</span>
            </CommandItem>
            <CommandItem onSelect={() => handleItemClick("Beneficiarios")}>
              <IconUsers className="w-4 h-4 mr-2" />
              <span>Beneficiarios</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Administrador">
            <CommandItem onSelect={() => handleItemClick("Usuarios")}>
              <IconUsersGroup className="w-4 h-4 mr-2" />
              <span>Usuarios</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
}

export default Navbar;
