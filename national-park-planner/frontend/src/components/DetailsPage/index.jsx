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
        return null; // or a loading indicator, or some other fallback
    }

    return (
        <div>
            <img src={props.images[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} />
            <h1>{props.fullName}</h1>
            <h2>States where located: {props.states}</h2>
            <br />
            <h2>____Activities Offered____</h2>
            <ul>
                {props.activities.map(activity => (
                    <li key={activity.id}>
                        <p>{activity.name}</p>
                    </li>
                ))}
            </ul>
            <br />
            <h2>---About the Park---</h2>
            <p>{props.description}</p>
            <div className="mt-4">
                <ReviewSection parkId={props.id} />
            </div>
        </div>
    );
}


//carousel for images, mayb activiteis

// automatic carousel for photos