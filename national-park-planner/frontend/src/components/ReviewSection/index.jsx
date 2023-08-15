import React, { useState, useEffect } from "react";
import { postReview, getReviews } from "../../../utils/backend";
import Review from "../Review";

function ReviewSection({ parkId }) {
  const [reviews, setReviews] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    name: "",
    content: "",
    tripDate: "",
  });

  useEffect(() => {
    console.log(parkId);
    getReviews(parkId).then((reviews) => setReviews(reviews));
  }, []);

  function handleInputChange(event) {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  }

  function toggleCreateForm() {
    setShowCreateForm(!showCreateForm);
  }

  function refreshReviews() {
    getReviews(parkId).then((newReviewData) => setReviews(newReviewData));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowCreateForm(false);

    postReview({ ...createFormData, parkId: parkId }).then(() =>
      refreshReviews()
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">User Reviews</h1>
      <button
        className={`px-4 py-2 rounded ${
          showCreateForm
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-green-600 text-white hover:bg-green-700"
        } transition duration-300`}
        onClick={toggleCreateForm}
      >
        {showCreateForm ? "Close" : "Write a Review"}
      </button>
      {showCreateForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              className="w-full px-4 py-2 border rounded"
              name="title"
              placeholder="Review title"
              value={createFormData.title}
              onChange={handleInputChange}
            />
            <input
              className="w-full px-4 py-2 border rounded"
              name="name"
              placeholder="Your name"
              value={createFormData.name}
              onChange={handleInputChange}
            />
            <textarea
              className="w-full px-4 py-2 border rounded h-32 resize-none"
              name="content"
              placeholder="Share your experience!"
              value={createFormData.content}
              onChange={handleInputChange}
            />
            <input
              className="w-full px-4 py-2 border rounded"
              type="date"
              name="tripDate"
              value={createFormData.tripDate}
              onChange={handleInputChange}
            />
            <button
              className="px-6 py-2 rounded text-white hover:bg-green-700 bg-green-600 transition duration-300 w-full"
              type="submit"
            >
              Post Review
            </button>
          </form>
        )}
        <div className="mt-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Review
                key={review._id}
                data={review}
                refreshReviews={refreshReviews}
              />
            ))
          ) : (
            <p className="text-gray-600">
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewSection;