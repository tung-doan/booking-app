import { useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios"
import { Navigate } from "react-router-dom"

export default function BookingWidget({ place }) {
    const [checkIn, setcheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')
    const [guests, setguests] = useState(1)
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [redirect, setredirect] = useState(false)
    let numsofnight = 0
    if (checkIn && checkOut) {
        numsofnight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
async function handleBook() {
    if (checkIn && checkOut && name && phone) {
         numsofnight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
       console.log(numsofnight)
        await axios.post('/booking', {
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            place: place._id,
            price:  place.price * numsofnight
        }).then(response => {
            const bookId = response.data._id;
            setredirect(true);
        });
    } else {
        alert('Please fill in all the fields');
    }
}
    
    if(redirect){
        return <Navigate to={'/account/bookings/'} />
    }

    return (
        <div className="bg-gray-200 border-2 border-black rounded-xl mt-4 shadow-md shadow-gray-500 p-8">
            <div className="text-2xl">
                Price: ${place.price}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-4 border border-gray-400 text-center rounded-xl">
                    <label>Check In Date: </label>
                    <input type="date" value={checkIn} onChange={(ev) => setcheckIn(ev.target.value)} />
                </div>
                <div className="p-4 border border-gray-400 text-center rounded-xl">
                    <label>Check Out Date: </label>
                    <input type="date" value={checkOut} onChange={(ev) => setcheckOut(ev.target.value)} />
                </div>

                <div className="col-span-2 p-4 border border-gray-400 text-center rounded-xl" >
                    <label>Number of guests: </label>
                    <input type="number" value={guests} placeholder="1" onChange={(ev) => setguests(ev.target.value)} />
                </div>
                {checkIn && checkOut && (
                  <>
                        <div className="col-span-2 p-4 border border-gray-400 text-center rounded-xl" >
                            <label>Your name: </label>
                            <input type="text" value={name} onChange={(ev) => setname(ev.target.value)} />
                        </div>
                        <div className="col-span-2 p-4 border border-gray-400 text-center rounded-xl" >
                            <label>Your telephone number: </label>
                            <input type="tel" value={phone} onChange={(ev) => setphone(ev.target.value)} />
                        </div>
                   </>
                   
                )}
                
            </div>
            <div className="bg-primary flex justify-center items-center p-4 rounded-3xl mt-2 hover:cursor-pointer" onClick={handleBook}>
                <button >Booking
                    {(checkIn && checkOut) && (
                        <span> ${place.price * numsofnight}</span>
                    )
                    }
                </button>
            </div>
        </div>
    )
}