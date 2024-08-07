import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/Beneficiarios/cards";
import Sidebar from "@/components/landing/Sidebar";

const userData = {
  "1": {
    nombre: "Luis Antonio De-Las-Heras",
    CURP: "PLTU210420MQTRMR82",
    fechaDeNacimiento: "1989-01-23",
    INE: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    actaNacimiento:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteDomicilio:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteIngresos:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
  },
  "2": {
    nombre: "Maria Josefa Soto",
    CURP: "OBGS340109HJCNFF71",
    fechaDeNacimiento: "1990-05-17",
    INE: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    actaNacimiento:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteDomicilio:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteIngresos:
      "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
  },
};

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = userData[userId ?? "1"];

  return (
    <>
      <nav>Regresar</nav>
      <div className="flex-1">
        <UserCard {...user} />
      </div>
    </>
  );
};

export default UserDetails;
