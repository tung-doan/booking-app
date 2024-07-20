import { useState } from "react";

export default function PlaceImage({place}){
    const [show, setshow] = useState(false);
    return (
        <div >
            {show && (
                <div >
                    <div className="fixed inset-0 bg-opacity-70 bg-slate-100 z-10 flex flex-col h-full justify-between items-center p-2 border-b overflow-scroll">

                        <button className="flex items-center fixed top-0 right-0 bg-red-600 rounded-2xl p-4 text-white text-xl font-semibold gap-2" onClick={() => setshow(false)} >
                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Close Photos
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
                                <img onClick={() => setshow(true)} src={'http://localhost:4000/uploads/' + place.photos[0]} alt="image" className="aspect-square object-cover cursor-pointer" ></img>
                            </div>)}
                    </div>
                    <div className="grid">
                        <div className="overflow-hidden">
                            {place.photos?.[1] && (
                                <img onClick={() => setshow(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos?.[1]}></img>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            {place.photos?.[3] && (
                                <img onClick={() => setshow(true)} src={'http://localhost:4000/uploads/' + place.photos?.[3]} className="top-2 relative aspect-square object-cover cursor-pointer" ></img>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="overflow-hidden">
                            {place.photos?.[4] && (
                                <img onClick={() => setshow(true)} src={'http://localhost:4000/uploads/' + place.photos?.[4]} className="top-2 relative aspect-square object-cover cursor-pointer" ></img>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            {place.photos?.[5] && (
                                <img onClick={() => setshow(true)} src={'http://localhost:4000/uploads/' + place.photos?.[5]} className="top-2 relative aspect-square object-cover cursor-pointer" ></img>
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
        </div>
    )
}