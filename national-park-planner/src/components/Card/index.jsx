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
                <h2>{parkData.fullName},{parkData.states}</h2>
                <br></br>
            </figcaption>
        </figure>
        </Link>
    )
}