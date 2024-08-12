import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconChevronLeft, IconClipboard, IconCheck } from "@tabler/icons-react";

interface UserProps {
  nombre: string;
  CURP: string;
  password: string;
  fechaDeNacimiento?: string;
  INE?: string;
  actaNacimiento?: string;
  comprobanteDomicilio?: string;
  comprobanteIngresos?: string;
}

const UserCard: React.FC<UserProps> = ({
  nombre,
  CURP,
  fechaDeNacimiento,
  INE,
  actaNacimiento,
  comprobanteDomicilio,
  comprobanteIngresos,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000); // Reset the copied state after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  // Helper function to format date
  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Detalles del usuario</CardTitle>
        <CardDescription>Datos del usuario seleccionado.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid items-center w-full gap-4">
          {/* Name Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nombre</Label>
            <div className="flex items-center w-full max-w-md space-x-2">
              <Input disabled id="name" placeholder={nombre} />
              <Button
                type="button"
                className="py-7"
                onClick={() => copyToClipboard(nombre, 'name')}
              >
                {copiedField === 'name' ? <IconCheck /> : <IconClipboard />}
              </Button>
            </div>
          </div>

          {/* CURP Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="CURP">CURP</Label>
            <div className="flex items-center w-full max-w-md space-x-2">
              <Input disabled id="CURP" placeholder={CURP} />
              <Button
                type="button"
                className="py-7"
                onClick={() => copyToClipboard(CURP, 'CURP')}
              >
                {copiedField === 'CURP' ? <IconCheck /> : <IconClipboard />}
              </Button>
            </div>
          </div>

          {/* Birth Date Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="birth">Fecha de Nacimiento</Label>
            <div className="flex items-center w-full max-w-md space-x-2">
              <Input
                disabled
                id="birth"
                placeholder={formatDate(fechaDeNacimiento)}
              />
              <Button
                type="button"
                className="py-7"
                onClick={() => copyToClipboard(fechaDeNacimiento || '', 'birth')}
              >
                {copiedField === 'birth' ? <IconCheck /> : <IconClipboard />}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {INE && (
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <a
                    href={INE}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver INE
                  </a>
                </p>
              </div>
            </div>
          )}

          {actaNacimiento && (
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <a
                    href={actaNacimiento}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Acta de Nacimiento
                  </a>
                </p>
              </div>
            </div>
          )}

          {comprobanteDomicilio && (
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <a
                    href={comprobanteDomicilio}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Comprobante de Domicilio
                  </a>
                </p>
              </div>
            </div>
          )}

          {comprobanteIngresos && (
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <a
                    href={comprobanteIngresos}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Comprobante de Ingresos
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="flex items-center" onClick={() => window.history.back()}>
          <IconChevronLeft className="size-6" />
          Regresar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
