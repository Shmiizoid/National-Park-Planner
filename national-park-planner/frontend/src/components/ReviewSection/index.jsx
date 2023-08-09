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
        <div className="p-4 border border-gray-300">
            <h1 className="text-xl font-semibold mb-2">User Reviews</h1>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleCreateForm}
            >
                {showCreateForm ? 'Close' : 'Create'}
            </button>
            {showCreateForm && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        className="w-full px-4 py-2 border rounded mb-2"
                        name="title"
                        placeholder="Review title"
                        value={createFormData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        className="w-full px-4 py-2 border rounded mb-2"
                        name="name"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        className="w-full px-4 py-2 border rounded mb-2"
                        name="content"
                        placeholder="Share your Experience!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <input
                        className="w-full px-4 py-2 border rounded mb-2"
                        type="date"
                        name="tripDate"
                        value={createFormData.tripDate}
                        onChange={handleInputChange}
                    />
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            )}
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
        </div>
    );
}

export default ReviewSection;