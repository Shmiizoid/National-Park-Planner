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

    return (
        <>
            <h1>Welcome!</h1>
            {articles.length > 0 ? (
                <div>
                    {articles.map(article => (
                        <div key={article.id}>
                            <h2>{article.title}</h2>
                            {article.image.url ? (
                                <img src={article.image.url} alt={article.title} />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>News articles loading...</p>
            )}
        </>
    );
}