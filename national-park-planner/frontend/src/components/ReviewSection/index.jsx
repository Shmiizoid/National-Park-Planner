import React, { useState, useEffect } from "react";
import { postReview, getReviews } from "../../../utils/backend";
import Review from "../Review";

function ReviewSection({ parkId }) {
    const [reviews, setReviews] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        title: '',
        name: '',
        content: '',
        tripDate: '',
    });

    useEffect(() => {
        console.log(parkId);
        getReviews(parkId)
            .then(reviews => setReviews(reviews));
    }, []);

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm);
    }

    function refreshReviews() {
        getReviews(parkId)
            .then(newReviewData => setReviews(newReviewData));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShowCreateForm(false);

        postReview({ ...createFormData, parkId: parkId })
            .then(() => refreshReviews());
    }

    return (
        <>
            <h1>User Reviews</h1>
            <button onClick={toggleCreateForm}>
                {showCreateForm ? 'Close' : 'Create'}
            </button>
            {showCreateForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        placeholder="Review title"
                        value={createFormData.title}
                        onChange={handleInputChange}
                    />
                    <br />
                    <input
                        name="name"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        placeholder="Share your Experience!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <br />
                    <input
                        type="date"
                        name="tripDate"
                        value={createFormData.tripDate}
                        onChange={handleInputChange}
                    />
                    <br />
                    <button type="submit">Post</button>
                </form>
            )}
            {/* Display existing reviews */}
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <Review
                        key={review._id}
                        data={review}
                        refreshReviews={refreshReviews}
                    />
                ))
            ) : (
                <p>No reviews yet. Be the first to share your experience!</p>
            )}
        </>
    );
}

export default ReviewSection;