import { useEffect } from 'react'
import './styles.css'


function App() {

  useEffect(() => {

    async function getData() {
      const res = await fetch('https://developer.nps.gov/api/v1/parks?parkCode=&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx')
      const park = await res.json()
      // console.log()
    }

    getData()
  }, [])

  return (
    <h1 className="text-3xl font-bold underline">National Parks Planner</h1>
  )
}

export default App
