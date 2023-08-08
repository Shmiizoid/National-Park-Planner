export default function DetailsPage({ fullName, description, states, activities, images }) {
    return (
        <div>
            <img src={images[1].url} />
            <h1>{fullName}</h1>       
            <h2>{states}</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        <p>{activity.name}</p>
                    </li>
                ))}
            </ul>
            <p>{description}</p>
        </div>
    )
}

//carousel for images, mayb activiteis