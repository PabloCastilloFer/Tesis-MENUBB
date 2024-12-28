import React, { useState, useEffect } from 'react';
import { getLocales } from '../../services/local.service'; // Llama al servicio
import LocalCard from './LocalCard'; // Componente reutilizable
import '../../styles/local/Local.css'; // Estilos de la página

const Local = () => {
  const [locales, setLocales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama al servicio para obtener locales
    const fetchLocales = async () => {
      try {
        const data = await getLocales();
        setLocales(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los locales.');
        setLoading(false);
      }
    };

    fetchLocales();
  }, []);

  if (loading) return <div>Cargando locales...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="local-container">
      <h1>Locales Disponibles</h1>
      <div className="local-list">
        {locales.map((local) => (
          <LocalCard key={local.id} name={local.name} image={local.image} />
        ))}
      </div>
    </div>
  );
};

export default Local;