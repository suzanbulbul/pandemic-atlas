import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";

//Library
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//Type
import { CountryData } from "../util/type/data.type";

interface MapProps {
  locations: CountryData[];
  width?: string;
  height?: string;
  zoom?: number;
  center?: boolean;
  className?: string;
}

const Map = ({
  locations,
  width = "100%",
  height = "400px",
  zoom = 1,
  center = false,
  className,
}: MapProps) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v10",
        center: center
          ? [locations[0].coordinates.lng, locations[0].coordinates.lat]
          : [0, 30],
        zoom: zoom,
      });
    }

    locations.forEach((locationList, listIndex) => {
      const { coordinates } = locationList;
      const { lng, lat } = coordinates;

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        router.push(`/country/${locationList.id}`);
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
