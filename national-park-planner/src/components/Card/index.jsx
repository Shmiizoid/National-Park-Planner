export default function Card({ parkData }) {
    return (
        <figure>
            <img src={parkData.images[0].url} />
            <figcaption>
                <h2>{parkData.fullName}</h2>
                <h3>{parkData.states}</h3>
            </figcaption>
        </figure>
    )
}