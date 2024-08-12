import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { DialogClose } from "@radix-ui/react-dialog";

const Categorias = () => {
  const [parent] = useAutoAnimate();
  const [beneficiosRecientes, setBeneficiosRecientes] = useState([]);
  const { user } = useAuth();
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Apoyo");

  const categorias = ["Apoyo", "Programas", "Otros"];

  const [tituloEditado, setTituloEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

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
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  const handleEliminarBeneficio = async (id) => {
    try {
      await axios.delete(`https://sits.onrender.com/api/beneficios/${id}`);
      setBeneficios(beneficios.filter((beneficio) => beneficio._id !== id));
    } catch (error) {
      console.error("Error al eliminar beneficio:", error);
    }
  };

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
      );
      setBeneficios(
        beneficios.map((beneficio) =>
          beneficio._id === idEditando ? response.data : beneficio
        )
      );
    } catch (error) {
      console.error("Error al actualizar beneficio:", error);
    }
  };

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        setLoading(true);
        setError(null);
        setBeneficios([]);
        const url = `https://sits.onrender.com/api/beneficios/categoria/${selectedCategory}`;
        const response = await axios.get(url);
        setBeneficios(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficios();
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="mt-10 mb-4 text-xl font-semibold">
        Seleccione una categoría de beneficios
      </h1>

      <Select
        onValueChange={handleCategoryChange}
        defaultValue={selectedCategory}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Seleccione una categoría de beneficios" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categorias</SelectLabel>
            <SelectItem key="Apoyo" value="Apoyo">
              Apoyo
            </SelectItem>
            <SelectItem key="Programas" value="Programas">
              Programas
            </SelectItem>
            <SelectItem key="Otros" value="Otros">
              Otros
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {loading ? (
        <div>Cargando beneficios...</div>
      ) : error ? (
        <div>Error al cargar: {error}</div>
      ) : (
        <ul ref={parent} className="grid gap-4 mt-10 md:grid-cols-3">
          {beneficios.map((beneficio) => (
            <Card
              key={beneficio._id}
              className="col-span-1 border rounded-md md:w-[440px]"
            >
              <CardHeader>
                <CardTitle>{beneficio.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[200px] h-[200px]">
                <p>{beneficio.descripcion}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-2">
                {user.status !== "commun" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        onClick={() => handleEditarBeneficio(beneficio)}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Beneficio</DialogTitle>
                        <DialogDescription>
                          Edita el beneficio aquí. Haga clic en Guardar cuando
                          haya terminado.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                          <Label
                            htmlFor="titulo-editado"
                            className="text-right"
                          >
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
                            onChange={(e) =>
                              setDescripcionEditada(e.target.value)
                            }
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
                )}

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
                      <Button variant={"default"}>Solicitar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Solicitud de Beneficio</DialogTitle>
                        <DialogDescription>
                          Beneficio Solicitado: {beneficio.titulo}
                        </DialogDescription>
                        <DialogDescription>
                          Beneficiario: {user.nombre}
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
                              <AlertDialogAction
                                onClick={() => {
                                  enviarCorreo(beneficio.titulo);
                                }}
                              >
                                Aceptar
                              </AlertDialogAction>
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
      )}
    </div>
  );
};

export default Categorias;
