import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";

// Library
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CountryFlag from "react-country-flag";

// Type
import { CountryData } from "../util/type/data.type";

interface MapProps {
  data: CountryData[];
  width?: string;
  height?: string;
  zoom?: number;
  center?: boolean;
  className?: string;
}

const Map = ({
  data,
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
        style: "mapbox://styles/mapbox/standard",
        center: center
          ? [data[0].coordinates.lng, data[0].coordinates.lat]
          : [0, 30],
        zoom: zoom,
      });
    }

    data.forEach((location, listIndex) => {
      const { coordinates } = location;
      const { lng, lat } = coordinates;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setText(`Country: ${location.id}`);

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        map.current!.flyTo({
          center: [lng, lat],
          zoom: 5,
          speed: 1.5,
          curve: 1,
          easing: function (t) {
            return t;
          },
          essential: true,
        });

        const container = document.createElement("div");
        container.className = "flex flex-col gap-4";

        const flag = document.createElement("img");
        flag.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${location.countryCode.toLowerCase()}.svg`;
        flag.className = "w-full";

        const country = document.createElement("h5");
        country.className =
          "text-2xl font-semibold tracking-tight text-gray-900 ";
        country.innerHTML = `${location.country}`;

        const confirmedCases = document.createElement("p");
        confirmedCases.className = " text-base text-black-500 ";
        confirmedCases.innerHTML = `Cases: ${location.confirmedCases}`;

        const deaths = document.createElement("p");
        deaths.className = " text-base text-red-500 ";
        deaths.innerHTML = `Deaths: ${location.deaths}`;

        const recovered = document.createElement("p");
        recovered.className = " text-base text-green-500";
        recovered.innerHTML = `Recovered: ${location.recovered}`;

        const moreInfoButton = document.createElement("button");
        moreInfoButton.className =
          "bg-rose-900 text-white font-bold py-2 px-4 rounded";
        moreInfoButton.textContent = "Wiew More Data";
        moreInfoButton.classList.add("more-info-button");

        moreInfoButton.addEventListener("click", () => {
          router.push(`/country/${location.id}`);
        });

        container.appendChild(flag);
        container.appendChild(country);
        container.appendChild(confirmedCases);
        container.appendChild(deaths);
        container.appendChild(recovered);
        container.appendChild(moreInfoButton);

        popup.setDOMContent(container);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [data]);

  return (
    <div ref={mapContainer} className={className} style={{ width, height }} />
  );
};

export default Map;
