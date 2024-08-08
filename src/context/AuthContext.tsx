// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Intentar cargar el usuario desde localStorage al iniciarse el contexto
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        // Configurar el usuario en el estado de React
        setUser(userData);

        // Guardar el usuario en localStorage
        localStorage.setItem('user', JSON.stringify({
            nombre: userData.nombre,
            numero: userData.numero,
            status: userData.status
        }));
    };

    const logout = () => {
        // Limpiar el usuario del estado de React
        setUser(null);
        // Eliminar el usuario de localStorage
        localStorage.removeItem('user');
    };

    // Asegurarse de mantener el estado del usuario actualizado con localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
