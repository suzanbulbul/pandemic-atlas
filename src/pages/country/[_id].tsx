import { useState, useEffect } from "react";
import Link from "next/link";

//Components
import Map from "../../components/Map";

//Icons
import { FaFontAwesomeFlag } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const CountryDetail = () => {
  const [mapHeight, setMapHeight] = useState("auto");

  useEffect(() => {
    const remValue = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const calculatedHeight = `calc(100vh - ${2 * remValue}px - 2rem)`;
    setMapHeight(calculatedHeight);
  }, []);

  const dummyData = [
    {
      country: "USA",
      confirmedCases: 5000000,
      deaths: 100000,
      recovered: 3000000,
      lastUpdated: "2024-05-03",
      coordinates: { lng: -95.712891, lat: 37.09024 },
    },
  ];

  return (
    <div>
      <div className="container mx-auto">
        <Link href="/">
          <FaArrowLeft className="w-7 h-7 text-gray-500 dark:text-gray-400 my-3" />
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Map
            className="rounded-lg shadow hidden md:block"
            locations={dummyData}
            height={mapHeight}
            width="100%"
            zoom={3}
            center
          />
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <FaFontAwesomeFlag className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              {dummyData[0]?.country}
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Confirmed Cases: {dummyData[0]?.confirmedCases}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Deaths: {dummyData[0]?.deaths}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Recovered: {dummyData[0]?.recovered}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Last Updated: {dummyData[0]?.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
