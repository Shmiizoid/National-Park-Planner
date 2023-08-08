import Gallery from '../Gallery'

export default function HomePage(props) {
    return (
        <>
        <h1>Parks</h1>

        <Gallery
                parks={props.parks}
                updateDetails={props.setDetailsData}
            />
        </>
    )
}