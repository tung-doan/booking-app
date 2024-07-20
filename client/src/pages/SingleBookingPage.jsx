import PlaceImage from "../PlaceImage"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format, differenceInCalendarDays } from 'date-fns'
import Perks from "../Perks"


export default function SingleBookingPage() {
    const [booking, setbooking] = useState(null);
    const [perks, setperks] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`/bookings`).then(response => {
                let placeinfo = response.data.filter(({ _id }) => _id === id);

                if (placeinfo.length > 0) {
                    setbooking(placeinfo[0])
                    setperks(placeinfo[0].place.perks)
                }
            })
        }
    }, [IDBOpenDBRequest])

    if (!booking) {
        return 'error';
    }

    return (

        <div className=" -mx-8 px-40 py-8 mt-4">
             <div className="font-bold text-xl mb-2">Your Booking informations:</div>
            <div className="bg-gray-200 p-4 rounded-xl flex justify-between">
            
                <div className="text-xl flex gap-2 items-center font-semibold ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                    </svg>
                    {format(new Date(booking.checkIn), 'yyyy-MM-dd') + '  ->  ' + format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                    <div className="flex items-center ml-4 gap-2">
                        Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="text-xl font-medium ">
                    {booking.place.checkIn + '  ->  ' + booking.place.checkOut}
                </div>

                </div>

                
                <div className="text-3xl font-medium flex justify-center items-center gap-2 bg-primary w-24 h-24 rounded-full text-white p-4">
                
                    ${booking.price * differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}</div>
            </div>
            <PlaceImage place={booking.place} />
            {booking.place.description && (
                <div className="mt-4 leading-8">
                    <div className="font-semibold text-xl mb-4">Description:</div>
                    {booking.place.description}
                </div>
            )}
            <div className="font-semibold text-xl mt-4">Perks:</div>
            <Perks value={perks} onchange={setperks} />
            <div className="font-semibold text-xl mt-4">Extra Infomations:</div>
            <div className="leading-8 mt-4">
                {booking.place.extraInfo}
            </div>
        </div>
    )
}