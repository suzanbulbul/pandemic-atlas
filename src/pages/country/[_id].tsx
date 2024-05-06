import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

//Redux
import { selectData } from "../../redux/slice";

//Library
import CountryFlag from "react-country-flag";

//Components
import Chart from "../../components/Chart";
import Divider from "../../components/Divider";

//Icons
import { FaArrowLeft } from "react-icons/fa";

//Type && Helper
import { CountryData, getCountryCode } from "../../util";

const CountryDetail = () => {
  const router = useRouter();
  const pageId = router?.query?._id;
  const dataList = useSelector(selectData);

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CountryData[]>([]);
  const [chartData, setChartData] = useState<{
    label: string;
    confirmedCases: number;
    deaths: number;
  }>();

  useEffect(() => {
    if (dataList) {
      const pageData = dataList.find((item: any) => item.country === pageId);

      if (pageData) {
        setLoading(false);
        setData([pageData]);
      }
      setChartData({
        label: pageData?.country || "",
        confirmedCases: pageData?.cases.total || 0,
        deaths: pageData?.deaths.total || 0,
      });
    }
  }, [pageId, dataList]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-rose-950 via-zinc-950 to-zinc-950 h-screen p-3">
        <Link href="/" className="flex items-center gap-2 text-md text-white">
          <FaArrowLeft className="w-5 h-5" />
          Go Back
        </Link>
        <div className="sm:w-6/12 w-full mx-auto mt-12 ">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 ">
                <CountryFlag
                  style={{ width: "24px", height: "24px" }}
                  countryCode={getCountryCode(data[0]?.country)}
                  svg
                />
                <h1 className="text-2xl font-semibold text-white">
                  {data[0]?.country}
                </h1>
              </div>
              <label className="text-white">COVID-19 Status</label>
            </div>
            <div className="flex flex-col text-center gap-2 w-full">
              <h2 className="text-white">Overview</h2>
              <div className="flex justify-around items-start">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-yellow-500">
                    {data[0]?.cases.total ? data[0]?.cases.total : "-"}
                  </h1>
                  <label className="text-sm font-thin text-white">cases</label>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-red-500">
                    {data[0]?.deaths.total ? data[0]?.deaths.total : "-"}
                  </h1>
                  <label className="text-sm font-thin text-white">deaths</label>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-green-500">
                    {data[0]?.cases.recovered ? data[0]?.cases.recovered : "-"}
                  </h1>
                  <label className="text-sm font-thin text-white">
                    recovered
                  </label>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-10 items-center">
              <div className="text-center">
                <h2 className="text-white">Cases</h2>
                <p className="text-gray-500">
                  per million people in {data[0]?.country}
                </p>
              </div>
              {chartData && <Chart data={chartData} />}
            </div>
            <Divider />
            <div className="text-center">
              <h2 className="text-white">Trends</h2>
              <p className="text-gray-500">
                No accurate data for {data[0]?.country} is available right
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
