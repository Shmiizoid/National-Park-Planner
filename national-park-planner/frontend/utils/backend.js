import axios from 'axios'
const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }

export async function getReviews(parkId) {

    const { data } = await axios.get(`/api/reviews/${parkId}`)
  
    return data
}

export async function postReview(review) {
    const { data } = await axios.post('/api/reviews', review, authHeader)
    return data
}
export async function updateReview(review, id) {
    const { data } = await axios.put(`/api/reviews/${id}`, review, authHeader)
    return data
}

export async function deleteReview(id) {
    const { data } = await axios.delete(`/api/reviews/${id}`, authHeader)
    return data
}

export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}