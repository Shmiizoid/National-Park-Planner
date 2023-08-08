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

    return (
        <>
            <h1>Welcome!</h1>
            {firstArticle ? (
                <div key={firstArticle.id}>
                    
                    <p>Release Date: {firstArticle.releaseDate}</p>
                    <img src={firstArticle.image.url || defaultImageUrl} alt={firstArticle.title} />
                    <h2>{firstArticle.title}</h2>
                </div>
            ) : (
                <p>News article loading...</p>
            )}
        </>
    );
}