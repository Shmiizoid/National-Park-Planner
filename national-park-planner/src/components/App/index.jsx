import { useState, useEffect } from 'react'
import './styles.css'


function App() {
  const [parks, setParks] = useState([])

  useEffect(() => {

    async function getData() {
      const res = await fetch('https://developer.nps.gov/api/v1/parks?parkCode=&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx')
      const { data } = await res.json()
      setParks(data)
      console.log(data)
    }

    getData()
  }, [])

  return (

    <>
    <h1 className="text-3xl font-bold underline">National Parks Planner</h1>
    {parks.length > 0 ? <img src={parks[1].images.url} /> : <p>Parks loading...</p>}
    </>
  )
}

export default App
