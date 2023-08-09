import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://developer.nps.gov/api/v1/newsreleases?limit=10&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx');
            const { data } = await res.json();
            setArticles(data);
        }

        getData();
    }, []);

    const firstArticle = articles.length > 0 ? articles[0] : null;
    const defaultImageUrl = 'https://www.amtrakvacations.com/sites/amtrak/files/styles/hero/public/images/Destination-Yosemite.jpg?h=3a3df0c5&itok=rGMyppyy';

    function formatReleaseDate(releaseDate) {
        const date = new Date(releaseDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <div className="border border-brown p-4">
            <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
            {firstArticle ? (
                <div key={firstArticle.id}>
                    <img src={firstArticle.image.url || defaultImageUrl} alt={firstArticle.title} />
                    <p className="text-sm">Release Date: {formatReleaseDate(firstArticle.releaseDate)}</p>
                    <h2 className="text-lg font-semibold mt-2">{firstArticle.title}</h2>
                </div>
            ) : (
                <p className="text-sm">News article loading...</p>
            )}
        </div>
    );
}