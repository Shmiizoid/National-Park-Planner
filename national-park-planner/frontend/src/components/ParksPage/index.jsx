import Gallery from '../Gallery'

export default function ParksPage(props) {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold my-8">National Parks</h1>
            
            <Gallery
                parks={props.parks}
                updateDetails={props.setDetailsData}
            />
        </div>
    )
}