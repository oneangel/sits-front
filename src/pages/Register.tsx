// Register.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import registerImage from "@/assets/images/register1.png";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    CURP: "",
    password: "",
    confirmPassword: "",
    fechaDeNacimiento: "",
  });
  const [files, setFiles] = useState({});

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
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    for (const key in files) {
      form.append(key, files[key]);
    }
    try {
      const res = await axios.post(
        "https://sits.onrender.com/api/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering the user");
    }
  };

  return (
    <div className="h-screen grid-cols-5 2xl:grid">
      <div className="hidden col-span-2 my-auto mx-36 2xl:block">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 h-[800px] w-[500px] rounded-[48px] flex items-center justify-center">
          <img src={registerImage} alt="" className="" />
        </div>
      </div>
      <div className="flex flex-col col-span-3 my-auto bg-white mx-14 lg:mx-56 2xl:-ml-10">
        <h2 className="text-4xl font-semibold">Registrarse</h2>
        <p className="text-lg text-[#313131] mt-4 mb-9 ">
          Vamos a prepararte para que puedas acceder a tu cuenta personal.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          </div>
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

          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
