import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import registerImage from "@/assets/images/register1.png";
import axios from "axios";
import sits from "@/assets/images/sitshd.png";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    CURP: "",
    password: "",
    confirmPassword: "",
    numero: "",
    fechaDeNacimiento: "",
  });
  const [files, setFiles] = useState({});
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingAlert; // Declarar la variable fuera del bloque `try` y `catch`
    try {
      // Mostrar alerta de cargando
      loadingAlert = await Swal.fire({
        title: "Registrando...",
        text: "Por favor, espere mientras procesamos su registro.",
        width: 400,
        padding: "1em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        allowOutsideClick: false,
        showConfirmButton: false, // Oculta el botón de confirmación
      });

      // Crear y llenar el formulario de datos
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      for (const key in files) {
        form.append(key, files[key]);
      }

      const res = await axios.post(
        "https://sits.onrender.com/api/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Cerrar alerta de cargando
      Swal.close(loadingAlert);

      // Enviar correo después de registro exitoso
      await axios.post("https://sits.onrender.com/enviar-correo", {
        titulo: "Activación de Cuenta",
        agremiado: formData.nombre,
        fecha: new Date().toLocaleDateString(),
        CURP: formData.CURP,
        numero: formData.numero,
      });

      Swal.fire({
        title: "Registro exitoso!",
        text: "Espere por favor a que nuestro equipo le contacte!",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      // Cerrar alerta de cargando en caso de error
      Swal.close(loadingAlert);

      console.error("Error registering user:", error);
      Swal.fire({
        title: "Ha ocurrido un error mientras se registraba al usuario!",
        text: "Vuelve a intentarlo más tarde",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const validateStep1 = () => {
    const requiredFields = [
      "nombre",
      "CURP",
      "password",
      "confirmPassword",
      "numero",
    ];
    return requiredFields.every((field) => formData[field] !== "");
  };

  const validateStep2 = () => {
    const requiredFiles = [
      "INE",
      "actaNacimiento",
      "comprobanteDomicilio",
      "comprobanteIngrsos",
    ];
    return requiredFiles.every((file) => files[file] !== undefined);
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      setError("Necesitas ingresar tus datos antes de continuar");
      return;
    }
    if (step === 2 && !validateStep2()) {
      setError("Necesitas cargar todos los archivos antes de continuar");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => {
    setError(null); // Clear error message when going back
    setStep(step - 1);
  };

  // Show the alert if there's an error only when trying to move to the next step
  if (error) {
    Swal.fire({
      title: "Cuidado!",
      text: error,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
    setError(null); // Clear the error after showing the alert
  }

  return (
    <div className="h-screen grid-cols-5 2xl:grid">
      <div className="hidden col-span-2 my-auto mx-36 2xl:block">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 h-[800px] w-[500px] rounded-[48px] flex items-center justify-center">
          <img src={registerImage} alt="" className="" />
        </div>
      </div>
      <div className="flex flex-col justify-center col-span-3 my-20 bg-white mx-14 lg:mx-56 2xl:-ml-10">
        <div className="flex justify-end ">
          <button
            className="flex items-center text-gray-700"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft className="size-12" />
            <img src={sits} alt="Logo" className="h-24" />
          </button>
        </div>
        <h2 className="text-4xl font-semibold">Registrarse</h2>
        <p className="text-lg text-[#313131] mt-4 mb-9 ">
          Vamos a prepararte para que puedas acceder a tu cuenta personal.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col col-span-1 gap-8">
                <Input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col col-span-1 gap-8">
                <Input
                  type="text"
                  id="CURP"
                  name="CURP"
                  placeholder="CURP"
                  value={formData.CURP}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                type="number"
                id="numero"
                name="numero"
                className="w-full col-span-2"
                placeholder="Introduzca su numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {step === 2 && (
            <>
              <div>
                <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
                <Input
                  type="date"
                  id="fechaDeNacimiento"
                  name="fechaDeNacimiento"
                  value={formData.fechaDeNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="INE">INE</label>
                <Input
                  type="file"
                  id="INE"
                  name="INE"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="actaNacimiento">Acta de Nacimiento</label>
                <Input
                  type="file"
                  id="actaNacimiento"
                  name="actaNacimiento"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="comprobanteDomicilio">
                  Comprobante de Domicilio
                </label>
                <Input
                  type="file"
                  id="comprobanteDomicilio"
                  name="comprobanteDomicilio"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="comprobanteIngrsos">
                  Comprobante de Ingresos
                </label>
                <Input
                  type="file"
                  id="comprobanteIngrsos"
                  name="comprobanteIngrsos"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" onClick={prevStep} className="w-full mr-2">
                Anterior
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={nextStep} className="w-full">
                Siguiente
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
