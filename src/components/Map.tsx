import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  locations: { lng: number; lat: number }[];
  width?: string;
  height?: string;
  className?: string;
}

const Map = ({
  locations,
  width = "100%",
  height = "400px",
  className,
}: MapProps) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v10",
        center: [0, 30],
        zoom: 1,
      });
    }
    locations.forEach((location, index) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        console.log("Marker clicked", index);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [locations]);

  return (
    <div ref={mapContainer} className={className} style={{ width, height }} />
  );
};

export default Map;
