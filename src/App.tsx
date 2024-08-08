import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import UserDetails from "./pages/Beneficiario";
import Resumen from "./pages/Resume";
import Categorias from "./pages/Categorias";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overview" element={<Overview />}>
            {/* Ruta por defecto dentro de Overview */}
            <Route index element={<Resumen />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="usuarios" element={<Admin />} />
          </Route>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
