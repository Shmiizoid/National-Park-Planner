import axios from 'axios'

export async function getReviews(parkId) {
    console.log("🥸",parkId)
    const { data } = await axios.get(`/api/reviews/${parkId}`)
    console.log("😱",data)
    return data
}

export async function postReview(review) {
    const { data } = await axios.post('/api/reviews', review)
    return data
}
export async function updateReview(review, id) {
    const { data } = await axios.put(`/api/reviews/${id}`, review)
    return data
}

export async function deleteReview(id) {
    const { data } = await axios.delete(`/api/reviews/${id}`)
    return data
}