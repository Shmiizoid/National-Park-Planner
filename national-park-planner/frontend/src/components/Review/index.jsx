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
        <div>
            {showEditForm ? (
                <form onSubmit={handleSubmit}>
                    <input
                        title="title"
                        placeholder="Review title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        placeholder="Share your experience!"
                        value={editFormData.content}
                        onChange={handleInputChange}
                    />
                    <div>
                        <button onClick={() => setShowEditForm(false)}>Close</button>
                        <button type="submit">Post</button>
                    </div>
                </form>
            ) : (
                <div>
                    <p>Post by: {data.name}</p>
                    <p>{data.title}</p>
                    <p>{data.content}</p>
                    <button onClick={() => setShowEditForm(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}