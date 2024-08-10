import React, { useEffect, useState } from "react";
import axios from "axios";

const Categorias = () => {
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Apoyo");

  const categorias = ["Apoyo", "Programas", "Otros"];

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    console.log("Cambiando categoría a:", newCategory);
    setSelectedCategory(newCategory);
  };

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        setLoading(true);
        setError(null); // Limpia cualquier error previo
        setBeneficios([]); // Limpia beneficios previos
        const url = `https://sits.onrender.com/api/beneficios/categoria/${selectedCategory}`;
        console.log("URL solicitada:", url);
        const response = await axios.get(url);
        console.log("Datos recibidos:", response.data);
        setBeneficios(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener beneficios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficios();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Seleccione una categoría de beneficios</h1>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {loading ? (
        <div>Cargando beneficios...</div>
      ) : error ? (
        <div>Error al cargar: {error}</div>
      ) : (
        <ul>
          {beneficios.map((beneficio) => (
            <li key={beneficio._id}>{beneficio.titulo}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categorias;
