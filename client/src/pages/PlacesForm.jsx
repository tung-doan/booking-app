import  { useEffect, useState } from 'react';
import Perks from "../Perks";
import axios from "axios";
import UploadedPhotos from "../UploadedPhotos";
import Pagenav from './AccountpageNav';
import { Navigate, useParams } from 'react-router-dom';

export default function Placesform() {

    const { id } = useParams();
    const [Title, setTitle] = useState('');
    const [Address, setAddress] = useState('');
    const [AddPhoto, setAddPhoto] = useState([]);
    const [Description, setDescription] = useState('');
    const [ExtraInfo, setExtraInfo] = useState('');
    const [Perk, setPerk] = useState([]);
    const [CheckIn, setCheckIn] = useState('');
    const [CheckOut, setCheckOut] = useState('');
    const [MaxGuests, setMaxGuests] = useState(1);
    const [redirect, setredirect] = useState(false);
    const [price, setprice] = useState(0);

    useEffect(() => {
        if (id) {
            axios.get('/places/' + id).then(response => {
                setTitle(response.data.title);
                setAddress(response.data.address);
                setAddPhoto(response.data.photos);
                setDescription(response.data.description);
                setExtraInfo(response.data.extraInfo);
                setPerk(response.data.perks);
                setCheckIn(response.data.checkIn);
                setCheckOut(response.data.checkOut);
                setMaxGuests(response.data.maxGuests);
                setprice(response.data.price);
            })
        }
    }, [id])

    function titlehandler(text, des) {
        return (
            <>
                <h2 className="text-xl mt-4">{text}</h2>
                <p className="text-sm text-gray-400">{des}</p>
            </>
        )
    }


    async function handlersubmit(ev) {
        ev.preventDefault();
        const placedata = {
            Title,
            Address,
            AddPhoto,
            Description,
            ExtraInfo,
            Perk,
            CheckIn,
            CheckOut,
            MaxGuests,
            price
        }
        if (id) {
            await axios.put('/places', { id, ...placedata })
        }
        else {
            await axios.post('/places', placedata)
        }
        setredirect(true)

    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <Pagenav />
            <form onSubmit={handlersubmit}>

                {titlehandler('Title', 'should be short and clearly')}
                <input type="text" value={Title} onChange={ev => setTitle(ev.target.value)} />

                {titlehandler('Address', 'should be detailed')}
                <input type="text" value={Address} onChange={ev => setAddress(ev.target.value)} />

                {titlehandler('Photo', 'many as possible')}


                <UploadedPhotos AddPhoto={AddPhoto} setAddPhoto={setAddPhoto} />
                {titlehandler('Description', 'tell us about your place')}

                <textarea value={Description} onChange={ev => setDescription(ev.target.value)} className="mt-2 border  border-gray-400 w-full h-32 "></textarea>
                {titlehandler('Perks', 'select all that apply with the perks of your place')}
                <Perks value={Perk} onchange={setPerk} />
                <h2 className="text-xl">Extra info</h2>
                <p className="text-sm text-gray-400 mt-2">if your place has any note </p>
                <textarea value={ExtraInfo} onChange={ev => setExtraInfo(ev.target.value)} className="mt-2 border-2 border-gray-400 w-full h-32 "></textarea>
                <h2>CHECK IN & OUT TIME</h2>
                <p className="text-sm text-gray-400 mt-2">remember to have some time window for cleaning between guests</p>
                <div className="grid gap-2 sm:grid-cols-3">
                    <label className=" p-3 border-2 rounded-2xl" >
                        <h3>Check In</h3>
                        <input value={CheckIn} onChange={ev => setCheckIn(ev.target.value)} type="string" placeholder="00:00 AM" />
                    </label>
                    <label className=" p-3 border-2 rounded-2xl" >
                        <h3>Check Out</h3>
                        <input value={CheckOut} onChange={ev => setCheckOut(ev.target.value)} type="string" placeholder="11:59 PM" />
                    </label>
                    <label className=" p-3 border-2 rounded-2xl" >
                        <h3>Max number of guests</h3>
                        <input value={MaxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="1" />
                    </label>
                    <label className=" p-3 border-2 rounded-2xl" >
                        <h3>Price per night</h3>
                        <input value={price} onChange={ev => setprice(ev.target.value)} type="number" placeholder='0' />
                    </label>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>

            </form>
        </>
    )
}