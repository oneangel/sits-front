// src/components/UserCard.tsx
import React from 'react';

interface UserProps {
  nombre: string;
  CURP: string;
  password: string;
  fechaDeNacimiento?: string;
  INE?: string;
  actaNacimiento?: string;
  comprobanteDomicilio?: string;
  comprobanteIngresos?: string;
}

const UserCard: React.FC<UserProps> = ({
  nombre,
  CURP,
  fechaDeNacimiento,
  INE,
  actaNacimiento,
  comprobanteDomicilio,
  comprobanteIngresos
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold">{nombre}</h2>
      <p className="text-sm text-gray-600">CURP: {CURP}</p>

      {fechaDeNacimiento && (
        <p className="text-sm text-gray-600">
          Fecha de Nacimiento: {new Date(fechaDeNacimiento).toLocaleDateString()}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {INE && <a href={INE} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ver INE</a>}
        {actaNacimiento && <a href={actaNacimiento} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ver Acta de Nacimiento</a>}
        {comprobanteDomicilio && <a href={comprobanteDomicilio} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ver Comprobante de Domicilio</a>}
        {comprobanteIngresos && <a href={comprobanteIngresos} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ver Comprobante de Ingresos</a>}
      </div>
    </div>
  );
};

export default UserCard;
