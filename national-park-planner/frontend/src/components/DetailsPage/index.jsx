import React, { useState, useEffect } from 'react';
import ReviewSection from '../ReviewSection';

export default function DetailsPage(props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    // Sort activities alphabetically 
    const sortedActivities = props.activities.slice().sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img src={props.images[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} className="w-full h-96 object-cover rounded-lg shadow-lg mb-6" />
                        <h2 className="text-xl">Located in: {props.states}</h2>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">{props.fullName}</h1>
                        <p className="text-lg mb-6">{props.description}</p>
                        <div className="mb-6">
                            <h2 className="text-xl mb-2">Activities Offered:</h2>
                            <div className="h-48 overflow-y-auto scrollbar-thumb-rounded scrollbar-thumb-gray-400 max-h-96">
                                <ul className="space-y-2">
                                    {sortedActivities.map(activity => (
                                        <li key={activity.id} className="flex items-center">
                                            <svg className="w-6 h-6 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-6l-4-4m6 10h4l-4-4m0 0L8 13m3 8V8"></path>
                                            </svg>
                                            <p>{activity.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <ReviewSection parkId={props.id} />
                </div>
            </div>
        </div>
    );
}