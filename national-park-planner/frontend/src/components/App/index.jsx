import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../HomePage';
import DetailsPage from '../DetailsPage';
import './styles.css';
import ParksPage from '../ParksPage';
import SearchPage from '../SearchPage'
import AuthFormPage from '../AuthFormPage'


function App() {
  const [parks, setParks] = useState([]);
  const [detailsData, setDetailsData] = useState({});

  async function getData(url) {
    const res = await fetch(url);
    const { data } = await res.json();

    const nationalParks = data.filter((park) => park.designation === 'National Park');

    setParks(nationalParks);
    console.log(nationalParks);
  }
  useEffect(() => {
    getData('https://developer.nps.gov/api/v1/parks?limit=999&sort=&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-900">
        <nav className="max-w-7xl mx-auto px-4 py-6 flex">
          <Link
            to="/"
            className="text-white text-xl font-semibold hover:underline hover:text-white mr-6"
          >
            Home
          </Link>

          <Link
            to="/parks"
            className="text-white text-xl font-semibold hover:underline hover:text-white mr-6"
          >
            Parks
          </Link>

          <Link to="/auth/signup"
                className="text-white text-xl font-semibold hover:underline hover:text-white mr-6"
                >
                Sign Up
              </Link>
    
              <Link to="/auth/login"
               className="text-white text-xl font-semibold hover:underline hover:text-white mr-6"
               >
                Log In
              </Link>

          <div className="ml-auto">
            <Link
              to="/search"
              className="text-white text-xl font-semibold hover:underline hover:text-white"
            >
              Search
            </Link>
          </div>
        </nav>
      </header>
  

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/parks"
            element={<ParksPage parks={parks} getData={getData} setDetailsData={setDetailsData} />}
          />
          <Route path="/search" element={<SearchPage setDetailsData={setDetailsData}/>} />
          <Route path="/details" element={<DetailsPage {...detailsData} />} />
          <Route path="/auth/:formType" element={<AuthFormPage />} />
        </Routes>
      </main>

      <footer className="bg-green-900 py-4">
        <div className="max-w-7xl mx-auto px-4 text-white text-center">
          © {new Date().getFullYear()} National Park Planner. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;