import Card from '../Card'

export default function Gallery({ parks }) {
    return (
        <div className="gallery">
            {parks.length > 0 ? parks.map(park => <Card key={park.id} parkData={park} />) :
            <p>Parks loading...</p>}
        </div>
    )
}