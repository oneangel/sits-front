// src/components/UserDetails.tsx

import React from 'react';
import UserCard from '../components/Beneficiarios/cards';

const UserDetails: React.FC = () => {
  const userData = {
    nombre: "Juan Pérez",
    CURP: "PEJJ890123HDFDRN09",
    fechaDeNacimiento: "1989-01-23",
    INE: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    actaNacimiento: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteDomicilio: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
    comprobanteIngresos: "https://sits-durango.s3.us-east-2.amazonaws.com/aver4/prueba3.pdf",
  };

  return <UserCard {...userData} />;
};

export default UserDetails;
