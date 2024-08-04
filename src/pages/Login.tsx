import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/images/login1.png";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/overview');
  };
  return (
    <>
      <div className="grid h-screen grid-cols-2">
        <div className="flex flex-col col-span-1 my-auto mx-36">
          <h2 className="text-4xl font-semibold">Iniciar Sesión</h2>
          <p className="text-lg text-[#313131] mt-4 mb-9 ">
            Ingresa tus datos de inicio de sesion para acceder a tu cuenta
          </p>
          <Input type="text" placeholder="CURP" />
          <Input type="password" placeholder="Contraseña" className="mt-4" />
          <Link to="/forgotpasword" className="mt-6 mb-10 text-base">
            ¿Olvidaste tu contraseña?
          </Link>
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
          <Link to="/register" className="mt-10">¿No tienes una cuenta aún? <span className="text-yellow-500">Registrate</span></Link>
        </div>

        <div className="col-span-1 my-auto mx-36">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 h-[800px] w-[500px] rounded-[48px] flex items-center justify-center">
            <img src={loginImage} alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
