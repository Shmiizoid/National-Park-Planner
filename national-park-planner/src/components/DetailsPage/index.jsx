import React, { useState, useEffect } from 'react';

export default function DetailsPage({ fullName, description, states, activities, images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div>
            <img src={images[currentImageIndex].url} alt={`Image ${currentImageIndex + 1}`} />
            <h1>{fullName}</h1>       
            <h2>States where located: {states}</h2>
            <br></br>
            <h2>____Activities Offered____</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        <p>{activity.name}</p>
                    </li>
                ))}
            </ul>
            <br></br>
            <h2>---About the Park---</h2>
            <p>{description}</p>
        </div>
    )
}

//carousel for images, mayb activiteis

// automatic carousel for photos