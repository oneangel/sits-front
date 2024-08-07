import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Data from './pages/Beneficiario';
import UserDetails from './pages/Beneficiario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
