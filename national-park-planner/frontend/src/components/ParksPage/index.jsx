import Gallery from '../Gallery'

export default function ParksPage(props) {
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
