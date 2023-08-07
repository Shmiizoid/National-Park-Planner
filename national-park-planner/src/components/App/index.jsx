import React, { useState, useEffect } from 'react';
import Gallery from '../Gallery'
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://developer.nps.gov/api/v1/parks?limit=999&sort=&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx');
      const { data } = await res.json();
      
      const nationalParks = data.filter(park => park.designation === "National Park");
      
      setParks(nationalParks);
      console.log(nationalParks);
    }

    getData();
  }, [])

  return (
    <>
      <h1>Nation Parks Planner</h1>
      <Gallery parks={parks} />
    </>
)
      }

      export default App;