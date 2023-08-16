import React, { useState } from "react";
import { updateReview, deleteReview } from "../../../utils/backend";

export default function Review({ data, refreshReviews }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: data.title,
    content: data.content,
    name: data.name,
  });

  function handleInputChange(event) {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateReview(editFormData, data._id).then(() => {
      refreshReviews();
      setShowEditForm(false);
    });
  }

  function handleDelete() {
    deleteReview(data._id).then(() => refreshReviews());
  }

  return (
    <div className="bg-stone-50 p-4 rounded-lg shadow-md mt-4">
      {showEditForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="title" className="block font-semibold mb-2">
            Title
          </label>
          <input
            id="title"
            className="w-full px-4 py-2 border rounded"
            name="title"
            placeholder="Review title"
            value={editFormData.title}
            onChange={handleInputChange}
          />
          <label htmlFor="content" className="block font-semibold mb-2">
            Review
          </label>
          <textarea
            id="content"
            className="w-full px-4 py-2 border rounded h-32 resize-none"
            name="content"
            placeholder="Share your experience!"
            value={editFormData.content}
            onChange={handleInputChange}
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-6 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition duration-300"
              onClick={() => setShowEditForm(false)}
            >
              Close
            </button>
            <button
              className="px-6 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition duration-300"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="text-gray-600">Posted by: {data.name}</p>
          <p className="text-xl font-semibold mb-2">{data.title}</p>
          <p>{data.content}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition duration-300"
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}