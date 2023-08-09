import React, { useState } from "react";
import { postReview } from "../../../utils/backend";

function CreateReviewPage({ parkId, images, description, onCreateReview }) {
    const [createFormData, setCreateFormData] = useState({
        title: "",
        name: "",
        content: "",
        tripDate: "",
    });

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        postReview({ ...createFormData, parkId: parkId })
            .then(() => {
                onCreateReview();
            });
    }

    return (
        <div>
            <h1>Write a New Review</h1>
            <img src={images[0].url} alt={`Park Image`} />
            <p>{description}</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Post Review</button>
            </form>
        </div>
    );
}

export default CreateReviewPage;