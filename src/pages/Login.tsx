import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/images/login1.png";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [CURP, setCURP] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log(CURP, password)
    try {
      const response = await axios.post('http://localhost:4000/api/login', { CURP, password });
      console.log(CURP, password)
      // Espera que el backend devuelva datos necesarios para la sesión
      const userData = response.data; 
      console.log(CURP, password)
      
      // Aquí, en lugar de manejar el token, podrías procesar o almacenar userData de alguna otra manera

      navigate('/overview');
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      if (error.response && error.response.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Error en el servidor');
      }
    }
  };
  

  return (
    <>
      <div className="grid h-screen xl:grid-cols-2">
        <div className="flex flex-col col-span-1 mx-10 my-auto lg:mx-36">
          <h2 className="text-4xl font-semibold">Iniciar Sesión</h2>
          <p className="text-lg text-[#313131] mt-4 mb-9 ">
            Ingresa tus datos de inicio de sesion para acceder a tu cuenta
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Link to="/forgotpasword" className="mt-6 mb-10 text-base">
            ¿Olvidaste tu contraseña?
          </Link>
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
          <Link to="/register" className="mt-10">¿No tienes una cuenta aún? <span className="text-yellow-500">Registrate</span></Link>
        </div>

        <div className="hidden my-auto lg:block lg:col-span-1 mx-36">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 h-[800px] w-[500px] rounded-[48px] flex items-center justify-center">
            <img src={loginImage} alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
