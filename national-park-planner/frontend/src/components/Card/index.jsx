import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ parkData, updateDetails }) {
    return (
        <Link
            to="/details"
            onClick={() => {
                updateDetails(parkData);
            }}
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
            <div className="h-64">
                <figure className="relative h-full">
                    <img src={parkData.images[0].url} alt={parkData.fullName} className="w-full h-full object-cover" />
                    <figcaption className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                        <h2 className="text-lg font-semibold">{parkData.fullName}</h2>
                        <p className="text-sm">{parkData.states}</p>
                    </figcaption>
                </figure>
            </div>
        </Link>
    );
}