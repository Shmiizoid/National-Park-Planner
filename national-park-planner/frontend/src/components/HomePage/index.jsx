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
    const defaultImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/US-NationalParkService-Logo.svg/1200px-US-NationalParkService-Logo.svg.png';

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
        <div className="bg-warm-gray-100 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                <section className=" flex flex-col items-center justify-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Welcome!</h1>
                    <p className="text-lg">
                        Welcome to our National Park Planner, your go-to destination for planning unforgettable trips to the most breathtaking national parks. Whether you're a seasoned explorer or embarking on your first outdoor adventure, our platform is designed to help you curate the perfect journey. Discover detailed park information, captivating images, and a wide range of activities offered by each park. But that's not all; we believe in the power of shared experiences. Leave your valuable reviews and insights to assist fellow travelers in crafting their own remarkable excursions. Together, we're building a community of nature enthusiasts who inspire and guide each other through the beauty of our nation's pristine landscapes. Start planning, start exploring, and start making memories that will last a lifetime. Welcome to your ultimate National Park companion.
                    </p>
                </section>
                
                <section className="mb-12">
                    <h1 className="text-2xl font-semibold mb-4">National Park News Alerts</h1>
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className="border border-brown p-4 flex cursor-pointer mb-4 rounded-lg shadow-md bg-white transition duration-300 hover:bg-gray-200"
                        >
                            <img className="flex-shrink-0 mr-4 h-24 w-24 object-cover rounded" src={article.image.url || defaultImageUrl} alt={article.title} />
                            <div className="flex-grow">
                                <p className="text-sm text-gray-500">Release Date: {formatReleaseDate(article.releaseDate)}</p>
                                <h2 className="text-lg font-semibold mt-2 cursor-pointer" onClick={() => handleArticleClick(index)}>{article.title}</h2>
                                {expandedArticles[index] && (
                                    <div className="mt-2">
                                        <p>{article.abstract}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}




