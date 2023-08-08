import { Link } from 'react-router-dom'

export default function Card({ parkData, updateDetails }) {

    return (
        <Link
            to={"/details"}
            onClick={() => { updateDetails(parkData) }}
        >
        <figure>
            <img src={parkData.images[0].url} />
            <figcaption>
                <h2>{parkData.fullName}</h2>
                <h3>{parkData.states}</h3>
            </figcaption>
        </figure>
        </Link>
    )
}