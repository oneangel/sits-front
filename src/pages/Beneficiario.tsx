import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/Beneficiarios/cards";
import Sidebar from "@/components/landing/Sidebar";

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://sits.onrender.com/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError("Usuario no encontrado.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setError("ID de usuario no proporcionado.");
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <nav>Regresar</nav>
      <div className="flex-1">
        {user && <UserCard {...user} />}
      </div>
    </>
  );
};

export default UserDetails;
