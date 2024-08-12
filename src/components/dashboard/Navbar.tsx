"use client";

import * as React from "react";
import {
  IconHomeDown,
  IconLayoutDashboardFilled,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const renderBreadcrumb = () => {
    const { pathname } = location;

    if (pathname === "/overview") {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/overview">Tableros</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Resumen</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    if (pathname === "/overview/categorias") {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/overview">Tableros</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categorías</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    if (pathname === "/overview/usuarios") {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/overview">Tableros</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/overview/usuarios">Administración</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Usuarios</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    return null;
  };

  return (
    <nav className="flex items-center justify-between w-full px-10 bg-white border-b-2 h-14">
      <Breadcrumb className="hidden md:block ">
        {renderBreadcrumb()}
      </Breadcrumb>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
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
            <CommandItem onSelect={() => handleNavigate("/overview")}>
              <IconLayoutDashboardFilled className="w-4 h-4 mr-2" />
              <span>Resumen</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigate("/overview/categorias")}>
              <IconHomeDown className="w-4 h-4 mr-2" />
              <span>Categorías</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Administrador">
            <CommandItem onSelect={() => handleNavigate("/overview/usuarios")}>
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
