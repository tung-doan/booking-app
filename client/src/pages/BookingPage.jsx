import { useEffect, useState } from "react"
import axios from "axios"
import { format, differenceInCalendarDays, previousDay } from 'date-fns'
import Pagenav from "./AccountpageNav"
import { Link } from "react-router-dom"


export default function BookingPage() {
    const [bookings, setbookings] = useState([])

    useEffect(() => {
        axios.get('bookings').then(response => {
            setbookings(response.data)

        }).catch(err => console.log(err))
    }, [])

    async function handlerdelte(bookingid) {
       await axios.delete('bookings/' + bookingid).then(response => {
        setbookings(response.data)
        console.log(response.data)
       }).catch(err => console.log(err))
    }


    return (
        <div>
            <Pagenav />
            {bookings.length >0 && bookings.map(booking => (
                
                <span className="grid grid-cols-[11fr_1fr] bg-gray-300 mt-10" key={booking._id}>
                
                    <Link to={'/account/bookings/' + booking._id} className="grid grid-cols-[1fr_6fr]  cursor-pointer gap-2  bg-gray-200 rounded-2xl overflow-hidden ">

                        <div className=" flex bg-gray-300 w-48 h-48" >
                            {booking.place.photos.length > 0 &&
                                <img src={import.meta.env.VITE_PHOTOS + booking.place.photos[0]} alt="image" className=" object-cover w-full h-full" ></img>
                            }
                        </div>
                        <div className="grow-0 shrink flex flex-col gap-2 ">
                            <h2 className="text-2xl font-bold"> {booking.place.title}</h2>
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
                            </div>

                            <div className="text-xl font-medium">
                                {booking.place.checkIn + '  ->  ' + booking.place.checkOut}
                            </div>

                            <div className="text-xl font-medium flex items-center gap-2">Total price:
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
                                </svg>

                                {booking.price}</div>
                        </div>

                    </Link>
                    <div className="bg-red-500 flex items-center justify-center cursor-pointer" onClick={() => handlerdelte(booking._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>

                </span>
            ))}
        </div>
    )
}