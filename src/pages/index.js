import React from "react";
import Map from "../components/Map";

const App = () => {
  const locations = [
    { lng: -74.005974, lat: 40.712776 },
    { lng: -0.127625, lat: 51.507222 },
    { lng: 139.6917, lat: 35.6895 },
  ];

  return (
    <div>
      <h1 className="text-blue-500">Pandemic Atlas</h1>
      <Map locations={locations} />
    </div>
  );
};

export default App;
