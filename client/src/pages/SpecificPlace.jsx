import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";


export default function SpecificPlace() {
    const [place, setplace] = useState(null);
    const [show, setshow] = useState(false);
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
            {show && (
                <div >
                    <div className="fixed inset-0 bg-opacity-70 bg-slate-100 z-10 flex flex-col overflow-y-auto h-full justify-between items-center p-4 border-b overflow-scroll">

                        <button className="fixed top-0 left-0 bg-red-600 rounded-full p-4" onClick={() => setshow(false)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {place.photos.length > 0 && place.photos.map(photo => (
                            <img src={'http://localhost:4000/uploads/' + photo} alt="image" className="aspect-square object-cover w-3/4 m-4"></img>
                        ))}
                    </div>
                </div>
            )}
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <div className="relative">
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mt-8 ">

                    <div className="overflow-hidden">
                        {place.photos?.[0] && (
                            <div>
                                <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt="image" className="aspect-square object-cover" ></img>
                            </div>)}
                    </div>
                    <div className="grid">
                        <div className="overflow-hidden">
                            {place.photos?.[1] && (
                                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos?.[1]}></img>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            {place.photos?.[3] && (
                                <img src={'http://localhost:4000/uploads/' + place.photos?.[3]} className="top-2 relative aspect-square object-cover" ></img>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="overflow-hidden">
                            {place.photos?.[4] && (
                                <img src={'http://localhost:4000/uploads/' + place.photos?.[4]} className="top-2 relative aspect-square object-cover" ></img>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            {place.photos?.[5] && (
                                <img src={'http://localhost:4000/uploads/' + place.photos?.[5]} className="top-2 relative aspect-square object-cover" ></img>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <span className=" flex justify-end">
                <button onClick={() => setshow(true)} className="bg-red-400 text-center mt-1 p-1 flex justify-center gap-2 absolute rounded-2xl text-2xl font-semibold hover:bg-red-200 border border-black shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 relative top-1 left-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    More photos
                </button>
            </span>
            <div className="flex">
                <a className="font-bold underline text-xl" href={'https://www.google.com/maps/place/' + place.address} target="_blank">{place.address}</a>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>

            </div>
            <div className="grid grid-cols-2 mt-4 gap-4">
                <div>
                    <h2 className="font-bold text-3xl">Description</h2>
                    <p>{place.description}</p>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >Check in: {place.checkIn}</div>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >check out: {place.checkOut}</div>
                    <div className="border p-2 m-2 rounded-2xl border-blue-300" >Max number of guests: {place.maxGuests}</div>
                </div>
                <div className="bg-gray-200 border-2 border-black rounded-xl mt-4 shadow-md shadow-gray-500 p-8">
                    <div className="text-2xl">
                        Price: ${place.price}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-4 border border-gray-400 text-center rounded-xl">
                            <label>check In: </label>
                            <input type="date" />
                        </div>
                        <div className="p-4 border border-gray-400 text-center rounded-xl">
                            <label>check Out: </label>
                            <input type="date" />
                        </div>
                        
                        <div className="col-span-2 p-4 border border-gray-400 text-center rounded-xl" >
                            <label>Number of guests: </label>
                            <input type="number" placeholder="1"/>
                        </div>
                    </div>
                    <div className="bg-primary text-center p-4 rounded-3xl mt-2">
                        <button>Booking</button>
                    </div>
                </div>
            </div>

        </div>
    )
}