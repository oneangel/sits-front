import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-label";

const Resumen = () => {
  const [beneficiosRecientes, setBeneficiosRecientes] = useState([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const response = await axios.get(
          "https://sits.onrender.com/api/beneficios"
        ); // Update with your actual endpoint URL
        setBeneficiosRecientes(response.data);
      } catch (error) {
        console.error("Error fetching beneficios:", error);
      }
    };

    fetchBeneficios();
  }, []);

  const handleEliminarBeneficio = async (id) => {
    try {
      await axios.delete(`https://sits.onrender.com/api/beneficios/${id}`); // Asegúrate de que la URL es correcta
      setBeneficiosRecientes(
        beneficiosRecientes.filter((beneficio) => beneficio._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar beneficio:", error);
    }
  };

  const [tituloNuevo, setTituloNuevo] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");

  const handleAgregarBeneficio = async () => {
    try {
      const nuevoBeneficio = {
        titulo: tituloNuevo,
        descripcion: descripcionNueva,
      };
      const response = await axios.post(
        "https://sits.onrender.com/api/beneficios",
        nuevoBeneficio
      ); // Asegúrate de que la URL es correcta
      setBeneficiosRecientes([...beneficiosRecientes, response.data]);
      setTituloNuevo(""); // Limpiar el campo del título
      setDescripcionNueva(""); // Limpiar el campo de la descripción
    } catch (error) {
      console.error("Error al agregar beneficio:", error);
    }
  };

  const [tituloEditado, setTituloEditado] = useState('');
const [descripcionEditada, setDescripcionEditada] = useState('');
const [idEditando, setIdEditando] = useState(null);

const handleEditarBeneficio = (beneficio) => {
  setTituloEditado(beneficio.titulo);
  setDescripcionEditada(beneficio.descripcion);
  setIdEditando(beneficio._id);
};

const handleGuardarCambios = async () => {
  try {
    const beneficioActualizado = {
      titulo: tituloEditado,
      descripcion: descripcionEditada,
    };
    const response = await axios.put(`https://sits.onrender.com/api/beneficios/${idEditando}`, beneficioActualizado); // Asegúrate de que la URL es correcta
    setBeneficiosRecientes(
      beneficiosRecientes.map((beneficio) =>
        beneficio._id === idEditando ? response.data : beneficio
      )
    );
  } catch (error) {
    console.error('Error al actualizar beneficio:', error);
  }
};

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Resumen de Beneficios Recientes
      </h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Agregar beneficio</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Beneficio</DialogTitle>
            <DialogDescription>
              Añade al beneficio aquí. Haga clic en Guardar haya terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title-nuevo" className="text-right">
                Titulo
              </Label>
              <Input
                id="title-nuevo"
                value={tituloNuevo}
                onChange={(e) => setTituloNuevo(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description-nueva" className="text-right">
                Descripcion
              </Label>
              <Input
                id="description-nueva"
                value={descripcionNueva}
                onChange={(e) => setDescripcionNueva(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAgregarBeneficio}>
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ul>
        {beneficiosRecientes.map((beneficio) => (
          <Card className="mt-10" key={beneficio._id}>
            <CardHeader>
              <CardTitle>{beneficio.titulo}</CardTitle>
              <CardDescription>{beneficio.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={"secondary"}
                    onClick={() => handleEditarBeneficio(beneficio)}
                  >
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Beneficio</DialogTitle>
                    <DialogDescription>
                      Edita al beneficio aquí. Haga clic en Guardar haya
                      terminado.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="titulo-editado" className="text-right">
                        Titulo
                      </Label>
                      <Input
                        id="titulo-editado"
                        value={tituloEditado}
                        onChange={(e) => setTituloEditado(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label
                        htmlFor="descripcion-editada"
                        className="text-right"
                      >
                        Descripcion
                      </Label>
                      <Input
                        id="descripcion-editada"
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleGuardarCambios}>
                      Guardar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Eliminar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Está seguro de eliminar este beneficio?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Este beneficio no se eliminará permanentemente, podrá
                      recuperarlo en la sección de beneficios.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white bg-red-500 hover:bg-red-400"
                      onClick={() => handleEliminarBeneficio(beneficio._id)}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Resumen;
