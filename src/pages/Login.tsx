import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  return (
    <div>
      <h2>Login Page</h2>
      <Input type="text" placeholder="CURP"/>
      <Input type="password" placeholder="Contraseña" />
      <Button>Iniciar Sesión</Button>
    </div>
  );
}

export default Login;
