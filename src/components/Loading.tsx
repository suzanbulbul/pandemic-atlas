import React from "react";

//Library
import Lottie from "lottie-react";
import animationData from "../util/animation/loading.json";

const Loading = () => {
  return (
    <div>
      <Lottie className="animation" animationData={animationData} />
    </div>
  );
};

export default Loading;
