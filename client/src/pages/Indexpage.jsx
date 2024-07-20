import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Indexpage() {
    const [places, setplaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setplaces(response.data)
        })
    }, []);

    return (
        <div className="mt-8 gap-x-6 gap-y-8 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id} key={place.owner} className="">
                    <div className="rounded-2xl mb-2">
                        {place.photos?.[0] &&
                            <img className="object-cover rounded-2xl aspect-square" src={import.meta.env.VITE_PHOTOS + place.photos[0]} alt="image" ></img>
                        }
                    </div>
                    <div>
                        <h2 className="font-bold ">{place.address}</h2>
                        <h3 className="text-sm">{place.title}</h3>
                        <div className="mt-2">
                            <span className="font-bold"> ${place.price} per night</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}