// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        CURP: '',
        password: '',
        confirmPassword: '',
        fechaDeNacimiento: '',
    });
    const [files, setFiles] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
        for (const key in files) {
            form.append(key, files[key]);
        }
        try {
            const res = await axios.post('http://localhost:4000/api/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering the user');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="CURP">CURP</label>
                <input
                    type="text"
                    id="CURP"
                    name="CURP"
                    value={formData.CURP}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
                <input
                    type="date"
                    id="fechaDeNacimiento"
                    name="fechaDeNacimiento"
                    value={formData.fechaDeNacimiento}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="INE">INE</label>
                <input
                    type="file"
                    id="INE"
                    name="INE"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label htmlFor="actaNacimiento">Acta de Nacimiento</label>
                <input
                    type="file"
                    id="actaNacimiento"
                    name="actaNacimiento"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label htmlFor="comprobanteDomicilio">Comprobante de Domicilio</label>
                <input
                    type="file"
                    id="comprobanteDomicilio"
                    name="comprobanteDomicilio"
                    onChange={handleFileChange}
                />
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
