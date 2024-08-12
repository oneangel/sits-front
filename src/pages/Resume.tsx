import { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@radix-ui/react-label";
import { DialogClose } from "@radix-ui/react-dialog";
import { IconPlus } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";

const Resumen = () => {
  const [parent] = useAutoAnimate();
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

  const { user } = useAuth();

  const enviarCorreo = async (tituloBeneficio) => {
    const fechaEnvio = new Date().toLocaleDateString();
    const correoData = {
      titulo: `Beneficio - ${tituloBeneficio}`,
      agremiado: user.nombre,
      fecha: fechaEnvio,
      CURP: user.CURP,
      numero: user.numero,
      solicitud: "Solicitud de beneficio",
    };

    try {
      await axios.post("https://sits.onrender.com/enviar-correo", correoData);
      console.log("Correo enviado exitosamente");
      Swal.fire({
        title: `Correo enviado exitosamente!`,
        text: "Su solicitud ha sido enviada, Estaremos comunicándonos con usted lo mas pronto posible",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  const handleEliminarBeneficio = async (id) => {
    try {
      await axios.delete(`https://sits.onrender.com/api/beneficios/${id}`);
      setBeneficiosRecientes(
        beneficiosRecientes.filter((beneficio) => beneficio._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar beneficio:", error);
    }
  };

  const [tituloNuevo, setTituloNuevo] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");
  const [categoriaNueva, setCategoriaNueva] = useState("");

  const handleAgregarBeneficio = async () => {
    try {
      const nuevoBeneficio = {
        titulo: tituloNuevo,
        descripcion: descripcionNueva,
        categoria: categoriaNueva, // Añadir la categoría
      };
      const response = await axios.post(
        "https://sits.onrender.com/api/beneficios",
        nuevoBeneficio
      );
      setBeneficiosRecientes([...beneficiosRecientes, response.data]);
      setTituloNuevo("");
      setDescripcionNueva("");
      setCategoriaNueva(""); // Limpiar la categoría seleccionada
    } catch (error) {
      console.error("Error al agregar beneficio:", error);
    }
  };

  const [tituloEditado, setTituloEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");
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
      const response = await axios.put(
        `https://sits.onrender.com/api/beneficios/${idEditando}`,
        beneficioActualizado
      ); // Asegúrate de que la URL es correcta
      setBeneficiosRecientes(
        beneficiosRecientes.map((beneficio) =>
          beneficio._id === idEditando ? response.data : beneficio
        )
      );
    } catch (error) {
      console.error("Error al actualizar beneficio:", error);
    }
  };

  return (
    <div className="">
      {user.status !== "commun" && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 p-4 px-10 mt-8 text-left transition bg-slate-100 rounded-2xl hover:scale-105 hover:bg-slate-200">
              <IconPlus className="-ml-4 size-8" />
              <div>
                <h3 className="text-lg font-semibold">Agregar beneficio</h3>
                <p className="text-sm text-gray-700">
                  Añadir cualquier beneficio
                </p>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Beneficio</DialogTitle>
              <DialogDescription>
                Añade el beneficio aquí. Haga clic en Guardar cuando haya
                terminado.
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
                <Textarea
                  id="description-nueva"
                  value={descripcionNueva}
                  onChange={(e) => setDescripcionNueva(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="categoria text-right">Categoria</Label>
                <Select
                  value={categoriaNueva}
                  onValueChange={setCategoriaNueva}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Apoyo">Apoyo</SelectItem>
                    <SelectItem value="Programas">Programa</SelectItem>
                    <SelectItem value="Otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleAgregarBeneficio}>
                  Agregar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <ul
        className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3 md:max-h-[700px] md:overflow-auto"
        ref={parent}
      >
        {beneficiosRecientes.map((beneficio) => (
          <Card className="col-span-1" key={beneficio._id}>
            <CardHeader>
              <CardTitle>{beneficio.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[200px] h-[200px]">
              <p>{beneficio.descripcion}</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Dialog>
                {user.status !== "commun" && (
                  <DialogTrigger asChild>
                    <Button
                      variant={"secondary"}
                      onClick={() => handleEditarBeneficio(beneficio)}
                    >
                      Editar
                    </Button>
                  </DialogTrigger>
                )}

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Beneficio</DialogTitle>
                    <DialogDescription>
                      Edita el beneficio aquí. Haga clic en Guardar cuando haya
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
                      <Textarea
                        id="descripcion-editada"
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" onClick={handleGuardarCambios}>
                        Guardar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {user.status !== "commun" && (
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
                        recuperarlo en la sección de Administrador.
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
              )}
              {user.status === "commun" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Solicitar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="mb-4 text-2xl">
                        Solicitud de Beneficio
                      </DialogTitle>
                      <DialogDescription className="font-semibold text-black text-md">
                        Beneficio Solicitado:{" "}
                        <span className="font-normal text-zinc-400">
                          {" "}
                          {beneficio.titulo}
                        </span>
                      </DialogDescription>
                      <DialogDescription className="font-semibold text-black text-md">
                        Beneficiario:{" "}
                        <span className="font-normal text-zinc-400">
                          {user.nombre}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button">Solicitar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmación de Solicitud
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Su información y su solicitud será enviada a las
                              oficinas de SITS donde nos estaremos comunicando
                              con usted lo más pronto posible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <DialogClose asChild>
                              <AlertDialogAction
                                onClick={() => {
                                  // Lógica para enviar el correo
                                  enviarCorreo(beneficio.titulo);
                                }}
                              >
                                Aceptar
                              </AlertDialogAction>
                            </DialogClose>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Resumen;
