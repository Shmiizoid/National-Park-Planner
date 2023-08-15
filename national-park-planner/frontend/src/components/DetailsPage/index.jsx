import React, { useState, useEffect } from 'react';
import ReviewSection from '../ReviewSection';

export default function DetailsPage(props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllActivities, setShowAllActivities] = useState(false);
    const [isActivitiesExpanded, setActivitiesExpanded] = useState(false);
    
    useEffect(() => {
        if (props.images && props.images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [props.images]);

    if (!props.images || props.images.length === 0) {
        return null;
    }

    const displayedActivities = showAllActivities
        ? props.activities
        : props.activities.slice(0, 5);

        return (
            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative">
                            <img src={props.images[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl font-bold mb-4">{props.fullName}</h1>
                            <p className="text-lg mb-6">{props.description}</p>
                            <h2 className="text-xl mb-4">States where located: {props.states}</h2>
                            <h2 className="text-xl mb-6">Activities Offered:</h2>
                            <ul className="space-y-2">
                                {displayedActivities.map(activity => (
                                    <li key={activity.id} className="flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-6l-4-4m6 10h4l-4-4m0 0L8 13m3 8V8"></path>
                                        </svg>
                                        <p>{activity.name}</p>
                                    </li>
                                ))}
                            </ul>
                            {props.activities.length > 5 && (
                                <button
                                    className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-300 mt-4 self-start"
                                    onClick={() => setShowAllActivities(!showAllActivities)}
                                >
                                    {showAllActivities ? 'Show Less' : 'Show All Activities'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-12">
                        <ReviewSection parkId={props.id} />
                    </div>
                </div>
            </div>
        );
  }