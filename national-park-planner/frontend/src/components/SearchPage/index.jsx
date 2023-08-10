import { useState } from "react"
import Gallery from "../Gallery"

export default function SearchPage(props) {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])

    async function getData(url) {
        const res = await fetch(url)
        const { data } = await res.json();
        setQueryResults(data); 
        console.log("🤢",data)
    }

    function handleQuerySubmit(event) {
        event.preventDefault()
        getData(`https://developer.nps.gov/api/v1/parks?limit=30&q=${query}&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx`)
    }

    return (
        <>
            <form onSubmit={handleQuerySubmit}>
                <label htmlFor="search" className="block font-medium mb-1">
                    <h1 className="text-3xl font-bold">Search for Parks</h1>
                </label>
                <br />
                <input
                    className="p-2 w-[60vw] rounded border border-black focus:outline-none focus:border-black"
                    name="search"
                    placeholder="Park name"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button
                    type="submit"
                    className="mx-1 px-4 py-2 text-white hover:text-white hover:bg-black bg-green-900 rounded transition-all duration-200"
                >
                    Search
                </button>
            </form>

            <Gallery
                parks={queryResults}
                refreshQueue={getData}
                url={`https://developer.nps.gov/api/v1/parks?limit=30&q=${query}&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx`}
                updateDetails={props.setDetailsData}
          
            />
        </>
    )
}