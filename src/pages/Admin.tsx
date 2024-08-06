import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    curp: "FURA040929HDHNYNA6",
    nombre: "Angel Fuentes",
    status: true,
  },
  {
    id: 2,
    curp: "FURA040929HDHNYNA6",
    nombre: "Angel Fuentes",
    status: false,
  },
  {
    id: 3,
    curp: "FURA040929HDHNYNA6",
    nombre: "Angel Fuentes",
    status: false,
  },
];

export default function Admin() {
  return (
    <Table>
      <TableCaption>Lista de usuarios registrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">CURP</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.curp}</TableCell>
            <TableCell>{user.nombre}</TableCell>
            <TableCell><Badge variant={user.status ? "success" : "destructive"}> {user.status ? "Activo" : "Inactivo"}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
