import React from "react";

//Components
import Map from '../components/Map'

const Index = () => {
  return (
   <div> 
    <h1 className="text-blue-500">Pandemic Atlas</h1>
    <Map lng={32.836956} lat={39.925018} zoom={14} />

   </div>
  )
}

export default Index;
