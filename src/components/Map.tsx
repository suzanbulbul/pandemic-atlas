import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//Type && Helper
import { CountryData, getCountryCode } from "../util";

interface MapProps {
  data: CountryData[];
  width?: string;
  height?: string;
  className?: string;
}

const Map = ({
  data,
  width = "100%",
  height = "400px",
  className,
}: MapProps) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;

  const [coordinates, setCoordinates] = useState<{
    [key: string]: [number, number];
  }>({});
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/standard",
        center: [0, 30],
        zoom: 2,
      });
    }

    const updatedCoordinates: { [key: string]: [number, number] } = {};

    data.forEach((location) => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.country}.json?access_token=${process.env.MAPBOX_TOKEN}`
      )
        .then((response) => response.json())
        .then((data) => {
          const [longitude, latitude] = data.features[0].center;
          updatedCoordinates[location.country] = [longitude, latitude];
          setCoordinates(updatedCoordinates);
        })
        .catch((error) => console.error("Error fetching coordinates:", error));
    });
  }, [data]);

  useEffect(() => {
    if (!map.current || !coordinates) return;

    const markers: mapboxgl.Marker[] = [];

    Object.entries(coordinates).forEach(([country, coords]) => {
      const [lng, lat] = coords;
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setText(`Country: ${country}`);

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

        const location = data.find((item) => item.country === country);

        if (location) {
          const countryCode = getCountryCode(location.country);
          const continentCode = getCountryCode(location.continent);

          console.log(location.continent, location.country);

          if (countryCode) {
            const flag = document.createElement("img");
            flag.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode.toLowerCase()}.svg`;
            flag.className = "w-full";
            container.appendChild(flag);
          }

          const countryElement = document.createElement("h5");
          countryElement.className =
            "text-2xl font-semibold tracking-tight text-gray-900 ";
          countryElement.innerHTML = `${location.country}`;
          const confirmedCases = document.createElement("p");
          confirmedCases.className = " text-base text-black-500 ";
          confirmedCases.innerHTML = `Cases: ${
            location.cases.total ? location.cases.total : "-"
          }`;

          const deaths = document.createElement("p");
          deaths.className = " text-base text-red-500 ";
          deaths.innerHTML = `Deaths: ${
            location.deaths.total ? location.deaths.total : "-"
          }`;

          const recovered = document.createElement("p");
          recovered.className = " text-base text-green-500";
          recovered.innerHTML = `Recovered: ${
            location.cases.recovered ? location.cases.recovered : "-"
          }`;

          const moreInfoButton = document.createElement("button");
          moreInfoButton.className =
            "bg-rose-900 text-white font-bold py-2 px-4 rounded";
          moreInfoButton.textContent = "View More Data";
          moreInfoButton.classList.add("more-info-button");

          moreInfoButton.addEventListener("click", () => {
            router.push(`/country/${location.country}`);
          });

          container.appendChild(countryElement);
          container.appendChild(confirmedCases);
          container.appendChild(deaths);
          container.appendChild(recovered);
          container.appendChild(moreInfoButton);

          popup.setDOMContent(container);
        }
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [coordinates, data, router]);

  return (
    <div ref={mapContainer} className={className} style={{ width, height }} />
  );
};

export default Map;
