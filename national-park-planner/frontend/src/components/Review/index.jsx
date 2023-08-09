import { useState } from "react"
import { updateReview, deleteReview } from "../../../utils/backend"

export default function Review({ data, refreshReviews }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        title: data.title,
        content: data.content
    })

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // setShowEditForm(false)
        updateReview(editFormData, data._id)
            .then(() => refreshReviews())
    }

    function handleDelete() {
        deleteReview(data._id)
            .then(() => refreshReviews())
    }

    let reviewElement = <div>
        <p>{data.name}</p>
        <p>{data.content}</p>

            <button
                onClick={() => { setShowEditForm(true) }}>
                Edit
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
    </div>


    if (showEditForm) {
        reviewElement = <form
            onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Your name"
                value={editFormData.name}
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
                <button
                    onClick={() => { setShowEditForm(false) }}
>
                    Close
                </button>
                <button type="submit">Post</button>
            </div>
        </form>
    }

    return reviewElement
}