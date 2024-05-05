import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// API
import { dummyData } from "../api/data";

// Redux
import { fetchDataRequest, selectData } from "../redux/slice";

// Components
import Map from "../components/Map";

const App = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectData);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dummyData) {
      setLoading(false);
      dispatch(fetchDataRequest(dummyData));
    }
  }, [dispatch]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <Map locations={data} height="100vh" width="100vw" />
    </div>
  );
};

export default App;
