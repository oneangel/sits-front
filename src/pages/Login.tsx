import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/images/login1.png";
import sits from "@/assets/images/sitshd.png";
import { IconArrowLeft } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [CURP, setCURP] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://sits.onrender.com/api/login", {
        CURP,
        password,
      });

      console.log("Respuesta del servidor:", response.data);

      const { nombre, status, CURP: curpFromResponse, numero } = response.data;
      console.log(`nombre ${nombre}`);
      console.log(`curp ${curpFromResponse}`);
      console.log(`status ${status}`);
      console.log(`numero ${numero}`);

      // Almacenar los datos en el contexto de autenticación
      login({ nombre, CURP: curpFromResponse, status, numero });

      navigate("/overview");
      Swal.fire({
        title: `Bienvenido ${nombre}`,
        text: "Todo esta listo!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Cuenta Inactiva!",
          text: "Comunicate con el asesor de SITS!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Credenciales Incorrectas!",
          text: "Vuelve a intentarlo!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center mx-36">
        <button
          className="flex items-center text-gray-700"
          onClick={() => navigate(-1)}
        >
          <IconArrowLeft className="size-12" />
          <img src={sits} alt="Logo" className="h-24" />
        </button>
      </div>

      <div className="flex flex-1 xl:grid xl:grid-cols-2">
        <div className="flex flex-col col-span-1 mx-10 my-auto lg:mx-36">
          <h2 className="text-4xl font-semibold">Iniciar Sesión</h2>
          <p className="text-lg text-[#313131] mt-4 mb-9">
            Ingresa tus datos de inicio de sesión para acceder a tu cuenta
          </p>
          <Input
            type="text"
            placeholder="CURP"
            value={CURP}
            onChange={(e) => setCURP(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            className="mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="mt-6 mb-10 ">
            Iniciar Sesión
          </Button>
          <Link to="/register" className="mt-10">
            ¿No tienes una cuenta aún?{" "}
            <span className="text-yellow-500">Regístrate</span>
          </Link>
        </div>

        <div className="hidden my-auto xl:block lg:col-span-1 mx-36">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 h-[800px] w-[500px] rounded-[48px] flex items-center justify-center">
            <img src={loginImage} alt="Imagen de inicio de sesión" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
