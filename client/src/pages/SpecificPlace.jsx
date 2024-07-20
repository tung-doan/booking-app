import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../Bookingwidget";
import PlaceImage from "../PlaceImage";


export default function SpecificPlace() {
    const [place, setplace] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`/places/${id}`).then(response => {
                setplace(response.data)
            })
        }
    }, [id])

    if (!place) {
        return ''
    }

    return (
        <div className="bg-gray-100 -mx-8 px-40 py-8 mt-4">
            
            <PlaceImage place={place} />
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1.3fr] mt-4 gap-8">
                <div>
                    <h2 className="font-bold text-3xl">Description</h2>
                    <p>{place.description}</p>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >Check in: {place.checkIn}</div>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >check out: {place.checkOut}</div>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >Max number of guests: {place.maxGuests}</div>
            
                </div>
                <BookingWidget place={place} />
            
            </div>
            <div className="bg-white p-4 mt-4 rounded-xl -mx-40 px-40 border-t">
            <div>
            <h2 className="font-bold text-3xl">Extra Info</h2>
            </div>
            <div className="leading-5 text-sm text-gray-700 mt-2">{place.extraInfo}</div>
            </div>
        </div>
    )
}