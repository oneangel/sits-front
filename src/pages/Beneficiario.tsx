import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/Beneficiarios/cards";
import Sidebar from "@/components/landing/Sidebar";
import { IconChevronLeft } from "@tabler/icons-react";

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://sits.onrender.com/api/users/${userId}`);
        console.log(response.data); // Verifica aquí qué datos estás recibiendo
        setUser(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          console.error("Network error or other issue:", error.message);
        }
        setError("Usuario no encontrado.");
      }
      
    };
    

    if (userId) {
      fetchUser();
    } else {
      setError("ID de usuario no proporcionado.");
      setIsLoading(false);
    }
    
  }, [userId]);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <nav></nav>
      <div className="flex flex-col items-center justify-center h-screen mx-auto my-auto">
        {user && <UserCard {...user} />}
      </div>
    </>
  );
};

export default UserDetails;
