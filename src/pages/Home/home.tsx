import React from "react";

//Toast
import toast from "react-hot-toast";

const Home = () => {
  return (
    <>
      <button onClick={() => toast.error("Sepete eklenemedi")}>deneme</button>
      Home
    </>
  );
};
export default Home;
