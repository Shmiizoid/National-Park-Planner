import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../HomePage';
import DetailsPage from '../DetailsPage';
// import './styles.css';
import ParksPage from '../ParksPage';
import SearchPage from '../SearchPage';
import AuthFormPage from '../AuthFormPage';

function App() {
  const [parks, setParks] = useState([]);
  const [detailsData, setDetailsData] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add this state

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setLoggedInUser({ email: 'Guest' });
    }
  }, []);

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
        <nav className="max-w-7xl mx-auto px-4 py-6 md:flex md:justify-between md:items-center md:space-x-4 flex-col items-center">
        <div className="md:flex md:justify-between md:items-center md:w-full">
            <div className="md:flex md:items-center md:space-x-4">
            <Link to="/"
              className="text-white text-4xl font-extrabold hover:text-gray-300">
                  National Park Planner
              </Link>
            </div>
            <div
              className="md:hidden cursor-pointer text-white text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              &#9776;
            </div>
          </div>
          <div
            className={`md:flex md:space-x-4 mt-4 ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <Link
              to="/parks"
              className="text-white font-semibold hover:text-gray-300 block my-2 md:my-0"
            >
              Parks
            </Link>
            <Link
              to="/search"
              className="text-white font-semibold hover:text-gray-300 block my-2 md:my-0"
            >
              Search
            </Link>
            <Link
              to="/auth/signup"
              className="text-white font-semibold hover:text-gray-300 block my-2 md:my-0"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/login"
              className="text-white font-semibold hover:text-gray-300 block my-2 md:my-0"
            >
              Log In
            </Link>
          </div>
          
          {loggedInUser && (
            <div className="md:text-sm text-white mt-4">
              Logged in as: {loggedInUser.email}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/parks"
            element={<ParksPage parks={parks} getData={getData} setDetailsData={setDetailsData} />}
          />
          <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
          <Route path="/details" element={<DetailsPage {...detailsData} />} />
          <Route path="/auth/:formType" element={<AuthFormPage setLoggedInUser={setLoggedInUser} />} />
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