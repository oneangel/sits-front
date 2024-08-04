import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const beneficiosRecientes = [
    {
      id: 1,
      titulo: "Beneficio 1",
      descripcion: "Descripción del beneficio 1",
    },
    {
      id: 2,
      titulo: "Beneficio 2",
      descripcion: "Descripción del beneficio 2",
    },
  ];

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
              <Label htmlFor="title" className="text-right">
                Titulo
              </Label>
              <Input id="title" value="Beneficio 1" className="col-span-3" />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Descripcion
              </Label>
              <Input
                id="description"
                value="Descripcion del beneficio"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ul>
        {beneficiosRecientes.map(() => (
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Beneficio</CardTitle>
              <CardDescription>Descripcion del beneficio</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"}>Editar</Button>
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
                      <Label htmlFor="title" className="text-right">
                        Titulo
                      </Label>
                      <Input
                        id="title"
                        value="Beneficio 1"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descripcion
                      </Label>
                      <Input
                        id="description"
                        value="Descripcion del beneficio"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Agregar</Button>
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
                      ¿Estas seguro de eliminar este beneficio?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Este benefico no se eliminara permanentemente, podras
                      recuperarlo en la secccion de beneficios
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="text-white bg-red-500 hover:bg-red-400">
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
