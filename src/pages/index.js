import React from "react";
import Map from "../components/Map";

const App = () => {
  const dummyData = [
    {
      country: "USA",
      confirmedCases: 5000000,
      deaths: 100000,
      recovered: 3000000,
      lastUpdated: "2024-05-03",
      coordinates: { lng: -74.005974, lat: 40.712776 }
    },
    {
      country: "UK",
      confirmedCases: 3000000,
      deaths: 80000,
      recovered: 2000000,
      lastUpdated: "2024-05-03",
      coordinates: { lng: -3.435973, lat: 55.378051 }
    },
  ];

  return (
    <div>
      <Map locations={dummyData} height="100vh" width="100vw"/>
    </div>
  );
};

export default App;
