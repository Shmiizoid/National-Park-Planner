import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import './styles.css';
import ParksPage from '../ParksPage';

function App() {
  const [parks, setParks] = useState([])
  const [detailsData, setDetailsData] = useState({})


    async function getData(url) {
      const res = await fetch(url)
      const { data } = await res.json()
      
      const nationalParks = data.filter(park => park.designation === "National Park");
      
      setParks(nationalParks);
      console.log(nationalParks);
    }
    useEffect(() => {
    getData('https://developer.nps.gov/api/v1/parks?limit=999&sort=&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx');
  }, [])

  return (
    <>
      <nav>
        <Link to="/">
         Home
        </Link>
        <Link to="/parks">
        Parks
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>}  />

        <Route path="/parks" element={
              <ParksPage
              parks={parks}
              getData={getData}
              setDetailsData={setDetailsData}
              />}
              />
              <Route path="/details" element={<DetailsPage {...detailsData} />} />
      </Routes>
    </>
)
      }

      export default App;