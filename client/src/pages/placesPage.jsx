import { Link, useParams } from "react-router-dom";
import Pagenav from "./AccountpageNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places, setplaces] = useState([])
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setplaces(data)
        })
    }, [])

    return (
        <div>
            <Pagenav />
            <div className="text-center">
                <Link className="bg-primary inline-flex gap-1 justify-center text-center rounded-full text-white px-6 py-2 " to='/account/places/new' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    add new places</Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (

                    <Link to={'/account/places/' + place._id} key={place.owner} className="grid grid-cols-[1fr_6fr] cursor-pointer gap-4 mt-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className=" flex bg-gray-300 w-48 h-48" >
                            {place.photos.length > 0 &&
                                <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt="image" className=" object-cover w-full h-full" ></img>
                            }
                        </div>
                        <div className="grow-0 shrink ">
                            <h2 className="text-2xl font-bold"> {place.title}</h2>
                            <p className="text-sm mt-2 leading-7">{place.description}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

