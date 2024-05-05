import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { selectData } from "../../redux/slice";

//Components
import Map from "../../components/Map";

//Icons
import { FaFontAwesomeFlag } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

//Type
import { CountryData } from "../../util/type/data.tyope";

const CountryDetail = () => {
  const router = useRouter();
  const pageId = router?.query?._id;
  const dataList = useSelector(selectData);

  const [loading, setLoading] = useState<boolean>(true);
  const [mapHeight, setMapHeight] = useState<string>("auto");
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    const remValue = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const calculatedHeight = `calc(100vh - ${2 * remValue}px - 2rem)`;
    setMapHeight(calculatedHeight);
  }, []);

  useEffect(() => {
    if (dataList) {
      const pageData = dataList.find((item: any) => item.id === pageId);
      if (pageData) {
        setLoading(false);
        setData([pageData]);
      }
    }
  }, [pageId, dataList]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <div className="container mx-auto">
        <Link href="/">
          <FaArrowLeft className="w-7 h-7 text-gray-500 dark:text-gray-400 my-3" />
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Map
            className="rounded-lg shadow hidden md:block"
            locations={data}
            height={mapHeight}
            width="100%"
            zoom={3}
            center
          />
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <FaFontAwesomeFlag className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              {data[0]?.country}
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Confirmed Cases: {data[0]?.confirmedCases}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Deaths: {data[0]?.deaths}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Recovered: {data[0]?.recovered}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Last Updated: {data[0]?.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
