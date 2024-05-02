import React, { useRef, useEffect } from "react";

//Mapbox
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  lng: number;
  lat: number;
  zoom?: number;
  width?: string;
  height?: string;
  className?: string;
}

const Map = ({
  lng,
  lat,
  zoom,
  className,
  width = "50vw",
  height = "50vw",
}: MapProps) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN as any;

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as any,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom,
    }) as any;
  });

  return (
    <div
      style={{ width: width, height: height }}
      className={`${className}`}
      ref={mapContainer}
    />
  );
};

export default Map;
