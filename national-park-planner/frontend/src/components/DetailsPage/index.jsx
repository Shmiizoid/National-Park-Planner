import React, { useState, useEffect } from 'react';
import ReviewSection from '../ReviewSection';

export default function DetailsPage(props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllActivities, setShowAllActivities] = useState(false);

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
        <div>
            <img src={props.images[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} />
            <h1>{props.fullName}</h1>
            <h2>States where located: {props.states}</h2>
            <br />
            <h2>---About the Park---</h2>
            <p>{props.description}</p>
            <br></br>
            <h2>____Activities Offered____</h2>
            <ul>
                {displayedActivities.map(activity => (
                    <li key={activity.id}>
                        <p>{activity.name}</p>
                    </li>
                ))}
            </ul>
            {props.activities.length > 5 && (
                <button onClick={() => setShowAllActivities(!showAllActivities)}>
                    {showAllActivities ? 'Show Less' : 'Show All Activities'}
                </button>
            )}
            <br />
            <div className="mt-4">
                <ReviewSection parkId={props.id} />
            </div>
        </div>
    );
}


//carousel for images, mayb activiteis

// automatic carousel for photos