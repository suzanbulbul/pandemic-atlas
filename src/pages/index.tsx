import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Hook
import { useQuery } from "@tanstack/react-query";

//API
import { getData } from "../api/data";

//Redux
import { fetchDataRequest, selectData } from "../redux/slice";

//Components
import { Map, Loading } from "../components";

//Type
import { CountryData } from "../util";

const App = () => {
  const dispatch = useDispatch();

  const counrtyData = useSelector(selectData);

  const { data } = useQuery<CountryData[]>({
    queryKey: ["counrtyData"],
    queryFn: () => getData(),
  });

  useEffect(() => {
    if (data) {
      dispatch(fetchDataRequest(data));
    }
  }, [data, dispatch]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <Map data={counrtyData} height="100vh" width="100vw" />
    </div>
  );
};

export default App;
