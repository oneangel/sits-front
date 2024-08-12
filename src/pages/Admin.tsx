import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";


export type User = {
  id: string;
  nombre: string;
  isActive: boolean;
  CURP: string;
};


export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showActive, setShowActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://sits.onrender.com/api/users");
        const usersData = response.data.map((user) => ({
          ...user,
          id: user._id, // Asignar _id a id
        }));
        setUsers(usersData);
      } catch (error) {
        setError("Error al cargar los usuarios.");
      } 
    };
    fetchUsers();
  }, []);
  const { user } = useAuth();
  const toggleStatus = useCallback(async (userId: string) => {
    try {
      await axios.put(
        `https://sits.onrender.com/api/users/${userId}/toggle-status`
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );

      Swal.fire({
        title: `Operacion Realizada`,
        text: "Listo!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  }, []);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "isActive",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant={row.getValue("isActive") ? "success" : "destructive"}>
          {row.getValue("isActive") ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      accessorKey: "CURP",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CURP
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("CURP")}</div>
      ),
    },
    {
      accessorKey: "nombre",
      header: () => <div className="text-left">Nombre</div>,
      cell: ({ row }) => (
        <div className="font-medium text-left">{row.getValue("nombre")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("CURP"))
              }
            >
              Copiar CURP
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (row.original.id) {
                  navigate(`/user-details/${row.original.id}`);
                } else {
                  console.error("El usuario no tiene un ID válido");
                }
              }}
            >
              Detalles del usuario
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleStatus(row.original.id)}>
              {row.original.isActive ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      columnFilters: showActive ? [{ id: "isActive", value: true }] : [],
    },
  });

  useEffect(() => {
    setColumnFilters((prevFilters) =>
      showActive
        ? [
            ...prevFilters.filter((filter) => filter.id !== "isActive"),
            { id: "isActive", value: true },
          ]
        : prevFilters.filter((filter) => filter.id !== "isActive")
    );
  }, [showActive]);


  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Buscar CURP..."
          value={(table.getColumn("CURP")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("CURP")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex flex-wrap gap-2">
            <p>Solo Activos</p>
            <Switch checked={showActive} onCheckedChange={setShowActive} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Regresar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
