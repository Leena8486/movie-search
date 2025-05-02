import React, { useState } from "react";
import { apiKey } from "../ApiKey/Api";
import axios from "axios";
import Home from "./Home";

export const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSearchHandler = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    setError("");
    setSearchTerm("");
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${searchTerm}&apiKey=${apiKey}`
      );
      // Check if the response indicates an error, e.g., movie not found:
      if (response.data.Response === "False") {
        setError(response.data.Error);
        setData({});
      } else {
        setData(response.data);
        console.log(response.data);
      }
    } catch (err) {
      setError("Error fetching movie details.");
      setData({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 w-full h-full pt-7 flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Type a Movie Name..."
          className="bg-white mr-4 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="border border-white rounded-md p-2 text-white cursor-pointer"
          onClick={onSearchHandler}
        >
          Search
        </button>
      </div>

      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Instead of using Object.keys incorrectly, check that data is not empty */}
      {Object.keys(data).length > 0 && (
        <>
          <h1 className="text-white font-bold text-4xl bg-blue-800 px-5 py-1 rounded-md">
            {data.Title}
          </h1>
          <div className="flex p-15 items-center">
            <div className="border border-white rounded-md  mr-6 shadow-2xl">
              {data.Poster && data.Poster !== "N/A" && (
                <img src={data.Poster} alt={data.Title} />
              )}
            </div>
            <div className="text-white font-bold bg-gray-600 p-5 rounded-md">
              <h1>Title: {data.Title}</h1>

              <p>Director: {data.Director}</p>

              <p>Genre: {data.Genre}</p>

              <p>Year: {data.Year}</p>

              <p>Country: {data.Country}</p>

              <p>Actors: {data.Actors}</p>

              <p>Language: {data.Language}</p>

              <p>Rating: {data.Ratings[0].Value}</p>

              <p>Plot: {data.Plot}</p>
            </div>
          </div>
        </>
      )}
      <Home />
    </div>
  );
};
