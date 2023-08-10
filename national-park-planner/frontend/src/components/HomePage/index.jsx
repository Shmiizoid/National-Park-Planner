import React, { useEffect, useState } from 'react';


export default function HomePage() {
    const [articles, setArticles] = useState([]);
    const [expandedArticles, setExpandedArticles] = useState(null);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://developer.nps.gov/api/v1/newsreleases?limit=10&api_key=EHE50dVZ9QSYk40I3F5PyWw0xg6XWf7tgecRSSyx');
            const { data } = await res.json();
            setArticles(data);
            setExpandedArticles(new Array(data.length).fill(false));
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
    const handleArticleClick = (index) => {
        setExpandedArticles(prevExpanded => {
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };


    return (
        <>
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <br></br>
        <p>Welcome to our National Park Planner, your go-to destination for planning unforgettable trips to the most breathtaking national parks. Whether you're a seasoned explorer or embarking on your first outdoor adventure, our platform is designed to help you curate the perfect journey. Discover detailed park information, captivating images, and a wide range of activities offered by each park. But that's not all; we believe in the power of shared experiences. Leave your valuable reviews and insights to assist fellow travelers in crafting their own remarkable excursions. Together, we're building a community of nature enthusiasts who inspire and guide each other through the beauty of our nation's pristine landscapes. Start planning, start exploring, and start making memories that will last a lifetime. Welcome to your ultimate National Park companion.</p>
        <br></br>
        {/* List of articles */}
        <h1>National Park News Alerts</h1>
            {articles.map((article, index) => (
                <div
                    key={article.id}
                    className="border border-brown p-4 flex cursor-pointer"
                >
                    <img className="flex-shrink-0 mr-4 h-24 w-24 object-cover" src={article.image.url || defaultImageUrl} alt={article.title} />
                    <div className="flex-grow">
                        <p className="text-sm">Release Date: {formatReleaseDate(article.releaseDate)}</p>
                        <h2 className="text-lg font-semibold mt-2" onClick={() => handleArticleClick(index)}>{article.title}</h2>
                        {expandedArticles[index] && (
                            <div>
                                <p>{article.abstract}</p>

                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}




