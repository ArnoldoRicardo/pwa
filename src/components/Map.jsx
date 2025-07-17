import { useEffect, useRef } from 'preact/hooks';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Evita que el mapa se reinicie

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Opciones de estilo: 'streets-v2', 'outdoor-v2', 'satellite', etc.
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${import.meta.env.PUBLIC_MAPTILER_API_KEY}`,
      center: [-99.1332, 19.4326], // Coordenadas de la Ciudad de México
      zoom: 9,
    });

    // Añade un marcador en el centro del mapa
    new maplibregl.Marker({ color: '#FF0000' })
      .setLngLat([-99.1332, 19.4326])
      .setPopup(
        new maplibregl.Popup().setHTML(
          '<h3>¡Hola, Creadora!</h3><p>Aquí puedes mostrar información sobre la artista.</p>'
        )
      )
      .addTo(map.current);

    // Limpia el mapa cuando el componente se desmonte
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
