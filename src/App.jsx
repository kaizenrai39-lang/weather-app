import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from "./services/weather-service.js";

function App() {
  const [cityName, setCityName] = useState('');
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['weather-data', cityName],
    queryFn: () => getWeatherData(cityName),
    enabled: enabled,
  });
  useEffect(() => {
    if(isFetched){
      setEnabled(false);
    }
  }, [isFetched]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-500">
        <p className="text-2xl font-bold text-white">
          Loading Weather...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-5 bg-gray-500">

      <div className="bg-white p-10">
        {error &&(
            <p className="text-red-500">
              {error?.response?.data?.message || "Failed to load data"}
            </p>
        )}
        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter city name"
            id="cityName"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setEnabled(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md"
          >
            Search
          </button>
          {isLoading && <p>Loading..</p>}
        </div>

        <div className="flex flex-col gap-4">

          <p className="text-xl font-bold">
            City Name:
            <span className="text-blue-600 ml-2">
              {data?.name}
            </span>
          </p>

          <p className="text-lg font-semibold">
            Weather Details:
          </p>

          {data?.weather?.map((item, index) => (
            <p
              key={index}
              className="text-lg text-gray-600"
            >
              {item?.main}
            </p>
          ))}

        </div>

      </div>

    </div>
  );
}

export default App;