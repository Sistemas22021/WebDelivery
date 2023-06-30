import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTranslation } from 'react-i18next';

mapboxgl.accessToken =
  'pk.eyJ1IjoibGF6YXJvbWFyaW4iLCJhIjoiY2xqMWpmeHhqMHIwOTNsb3htcXlsYXRwayJ9.m4ShG7bwjJ_BMjs6eYxFxg';

const Map = () => {
  useEffect(() => {
    // Crear una instancia de mapbox-gl en el elemento con id 'map'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-106.65114, 35.08449], // Coordenadas de longitud y latitud
      zoom: 9, // Nivel de zoom
      interactive: false,
    });

    // Limpia el mapa al desmontar el componente
    return () => map.remove();
  }, []);
  const [t] = useTranslation('global');
  return (
    <>
      <div id="map" className=" rounded mt-5 h-2/3 ">
        <h2 className="mb-5 text-2xl font-bold">Nuestra Ubicacion 🗺️ </h2>
      </div>
      <br />
      <div className="mt-5   p-5 rounded">
        <p>Estamos ubicados en Alburquequet (Nuevo Mexico)🌎</p>
        <p>Tlf: +1 5829-4885 ☎️</p>
        <p>Email: hermanospollos@cuack.com 📧</p>
      </div>
    </>
  );
};

export default Map;
