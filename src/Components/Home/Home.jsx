import React, { useEffect, useState } from "react";
import data from "../../data.json";
import WeatherCard from "../WeatherCard/WeatherCard";

function Home() {
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState({
    search: "",
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = "2c241eb2727a2090d3ee60182ee20837";

  const getWeatherData = async (search) => {
    try {
      setIsLoading(true); // Set loading to true before making the API call

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
      );

      if (response.ok) {
        const weatherData = await response.json();
        setWeatherData(weatherData);
        console.log(weatherData);
      } else {
        // If the response is not okay, throw an error
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false after the API call completes, whether successful or not
    }
  };

  const handleSearchInput = (e) => {
    let value = e.target.value || e.target.textContent;
    // if (value === "") {
    //   setFilterData([]);
    //   return;
    // }

    let storeFilterData = data.filter((item) =>
      item.toLowerCase().includes(value)
    );
    setFilterData(storeFilterData);

    setSearchData((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  const handleButton = () => {
    getWeatherData(searchData.search);
    // console.log(searchData);
  };

  return (
    <div className="relative flex justify-center ">
      <img src="/assets/weather.jpg" className="h-[900px] w-full object-cover " alt="" />
      <div className="all_data absolute top-0  w-full md:w-6/12 lg:w-4/12 p-5 mx-auto">
        <div className="search_input  relative">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent text-white border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search..."
              id="search"
              value={searchData.search}
              onChange={handleSearchInput}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleButton}
            >
              Search
            </button>
          </div>
          {filterData && filterData.length > 0 && (
            <div className="mt-4 h-60 overflow-y-auto absolute top-15 left-0 w-full bg-white rounded-md">
              <ul className="list-none p-0">
                {filterData.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-800 border-b border-teal-400 p-2 cursor-pointer hover:text-teal-500 transition duration-300"
                    id="search"
                    onClick={handleSearchInput}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-5">
          {isLoading ? (
            <p className="font-semibold text-gray-600 ">Weather Information</p>
          ) : (
            <WeatherCard weatherData={weatherData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
