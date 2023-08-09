import { useState, useEffect } from "react"
import { postReview, getReviews } from "../../../utils/backend"
import Review from "../Review"

export default function reviewSection({ parkId }) {
   
    const [reviews, setReviews] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    })

    useEffect(() => {
        console.log(parkId)
        getReviews(parkId)
            .then(reviews => setReviews(reviews))
    }, [])

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    function refreshReviews() {
        getReviews(parkId)
            .then(newReviewData => setReviews(newReviewData))
    }
    
        function handleSubmit(event) {
            event.preventDefault()
            setCreateFormData({
                name: '',
                content: ''
            })
     
            setShowCreateForm(false)
     
            postReview({ ...createFormData, parkId: parkId })
                .then(() => refreshReviews())
        }
    
        let reviewElements = [<p key='0'>No reviews yet. Be the first to share your experience!</p>]
        if (reviews.length > 0) {
            reviewElements = reviews.map(review => {
                return <Review
                    key={review._id}
                    data={review}
                    refreshReviews={refreshReviews}
                />
            })
        }

        let btnText = 'Create'
        if (showCreateForm) {
            btnText = 'Close'
        }
    return (
        <>
            <h1>User Reviews</h1>
            <button onClick={toggleCreateForm}>
                {btnText}
            </button>
            {
                showCreateForm && <form onSubmit={handleSubmit}>
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
                    <button type="submit">Post</button>
                </form>
            }
            {reviewElements}
        </>
    )
}