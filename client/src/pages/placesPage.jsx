import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const [Title, setTitle] = useState('');
    const [Address, setAddress] = useState('');
    const [PhotoLinks, setPhotoLinks] = useState('');
    const [AddPhoto, setAddPhoto] = useState([]);
    const [Description, setDescription] = useState('');
    const [ExtraInfo, setExtraInfo] = useState('');
    const [Perk, setPerk] = useState([]);
    const [CheckIn, setCheckIn] = useState('');
    const [CheckOut, setCheckOut] = useState('');
    const [MaxGuests, setMaxGuests] = useState(1);

    let { action } = useParams();
    if (action) {
        action = action.toString(); // Convert the object to a string
    }

    function titlehandler(text, des){
        return (
            <>
             <h2 className="text-xl mt-4">{text}</h2>
             <p className="text-sm text-gray-400">{des}</p>
            </>
        )
    }

    async function uploadPhoto(ev){
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {Link: PhotoLinks})
    setAddPhoto(prev => {
        return [...prev, filename]  })

    setPhotoLinks('')
    }

     function uploadPhotoFile(ev){
        const files = ev.target.files;
        const formdata = new FormData();
        formdata.set('Photos', files)
        axios.post('/upload', formdata, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            const {data:filename} = response;
            setAddPhoto(prev => {
                return [...prev, filename]
            })
        })
    }
    return (

        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="bg-primary inline-flex gap-1 justify-center text-center rounded-full text-white px-6 py-2 " to='/account/places/new' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        add new places</Link>
                </div>
            )}
            {action === 'new' && (
                <form>
                    {/* <h2 className="text-xl">Title</h2>
                    <p className="text-sm text-gray-400">should be short and clearly</p> */}
                    {titlehandler('Title', 'should be short and clearly')}
                    <input type="text"  value={Title} onChange={ev => setTitle(ev.target.value)} />
                    {/* <h2 className="text-xl">Address</h2>
                    <p className="text-sm text-gray-400">should be detailed</p> */}
                    {titlehandler('Address', 'should be detailed')}
                    <input type="text"  value={Address} onChange={ev => setAddress(ev.target.value)} />
                    {/* <h2 className="text-xl">Photo</h2>
                    <p className="text-sm text-gray-400">many as possible</p> */}
                   {titlehandler('Photo', 'many as possible')}
                    <div className="flex  gap-2 mt-2">
                        <input type='text' className="basis-4/5" placeholder=" .jpg link" value={PhotoLinks} onChange = {ev => setPhotoLinks(ev.target.value) }></input>
                        <button onClick={uploadPhoto} className="bg-red-400 rounded-2xl min-h-4 grow">Add photos</button>
                    </div>
                   
                    <div className="mt-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                    {AddPhoto.length > 0 && AddPhoto.map(image => {
                        return (
                            <div >
                                <img  className="rounded-2xl " src = {'http://localhost:4000/uploads/' + image} alt="image"></img>
                            </div>
                        )
                    }) }
                        <label className="gap-2 cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex items-center justify-center">
                            <input type="file"className="hidden" onChange={uploadPhotoFile} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            upload
                        </label>
                    </div>
                    {/* <h2 className="text-xl">Description</h2>
                    <p className="text-sm text-gray-400 mt-2">tell us about your place</p> */}
                    {titlehandler('Description', 'tell us about your place')}

                    <textarea value={Description} onChange={ev => setDescription(ev.target.value) } className="mt-2 border  border-gray-400 w-full h-32 "></textarea>
                    {titlehandler('Perks', 'select all that apply with the perks of your place')}
                    <Perks value={Perk} onchange= {setPerk} />
                    <h2 className="text-xl">Extra info</h2>
                    <p className="text-sm text-gray-400 mt-2">if your place has any note </p>
                    <textarea value={ExtraInfo} onChange={ev => setExtraInfo(ev.target.value) } className="mt-2 border-2 border-gray-400 w-full h-32 "></textarea>
                    <h2>CHECK IN & OUT TIME</h2>
                    <p className="text-sm text-gray-400 mt-2">remember to have some time window for cleaning between guests</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div className=" p-3 border-2 rounded-2xl">
                            <h3>Check In</h3>
                            <input value={CheckIn} onChange = {ev => setCheckIn(ev.target.value) } type="time" placeholder="00:00" />
                        </div>
                        <div className=" p-3 border-2 rounded-2xl">
                            <h3>Check Out</h3>
                            <input value={CheckOut} onChange={ev => setCheckOut(ev.target.value)} type="time" placeholder="00:00" />
                        </div>
                        <div className=" p-3 border-2 rounded-2xl">
                            <h3>Max number of guests</h3>
                            <input value={MaxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="1"/>
                        </div>
                    </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>

                </form>
            )}

        </div>
    )
}