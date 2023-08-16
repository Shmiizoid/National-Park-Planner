import React, { useState } from "react";
import Gallery from "../Gallery";

export default function SearchPage(props) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);

  async function getData(url) {
    const res = await fetch(url);
    const { data } = await res.json();
    setQueryResults(data);
  }

  function handleQuerySubmit(event) {
    event.preventDefault();
    getData(
      `https://developer.nps.gov/api/v1/parks?limit=30&q=${query}&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx`
    );
  }

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  
  return (
    <div id="search">
    <div className="flex flex-col items-center justify-center min-h-screen bg-warm-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Search for Parks</h1>
        <form onSubmit={handleQuerySubmit} className="flex flex-col items-center space-y-4">
          <input
            className={`p-3 border rounded focus:outline-none ${
              inputFocused ? "placeholder-transparent" : ""
            }`}
            name="search"
            placeholder={!inputFocused ? "Search for parks..." : ""}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button
            type="submit"
            className="px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700 transition-all duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {queryResults.length > 0 && (
        <div className="mt-6 max-w-screen-xl mx-auto">
          <Gallery
            parks={queryResults}
            refreshQueue={getData}
            url={`https://developer.nps.gov/api/v1/parks?limit=30&q=${query}&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx`}
            updateDetails={props.setDetailsData}
          />
        </div>
       )}
      </div>
    </div>
  );
}