import React from "react";
import { Input } from "@/components/ui/input";
import { IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface FileUploadInputProps {
  label: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ label }) => (
  <div className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
    <label className="flex items-center space-x-2 cursor-pointer">
      <IconUpload />
      <span>{label}</span>
      <Input type="file" className="hidden" />
    </label>
  </div>
);

function Register() {
  return (
    <>
      <div className="grid w-screen grid-cols-5">
        <div className="h-screen col-span-2"></div>
        <div className="h-screen col-span-3 p-4 space-y-4">
          <Input type="text" placeholder="CURP" />

          <FileUploadInput label="INE" />
          <FileUploadInput label="Acta de Nacimiento" />
          <FileUploadInput label="Comprobante de domicilio" />

          <Input type="password" placeholder="Contraseña" />
          <Input type="password" placeholder="Confirmar Contraseña" />
          <Button>Registrarse</Button>
        </div>
      </div>
    </>
  );
}

export default Register;
