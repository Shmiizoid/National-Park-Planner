
import Card from '../Card'

export default function Gallery({ parks, updateDetails }) {
    let galleryContent = <p>Parks loading...</p>

    if (parks.length > 0) {
        galleryContent = parks.map(park => 
        <Card key={park.id} parkData={park} updateDetails={updateDetails}/>)
    }

    return (
        <div className="gallery">
            {galleryContent}
        </div>
    )
}

