import { useState } from "react";
import axios from "axios";


export default function UploadedPhotos({ AddPhoto, setAddPhoto }) {
    const [PhotoLinks, setPhotoLinks] = useState('');

    async function uploadPhoto(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { Link: PhotoLinks })
        setAddPhoto(prev => {
            return [...prev, filename]
        })

        setPhotoLinks('')
    }

    function uploadPhotoFile(ev) {
        const files = ev.target.files;
        const formdata = new FormData();
        for (let i = 0; i < files.length; i++) {
            formdata.append('Photos', files[i])
        }
        axios.post('/upload', formdata, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filename } = response;
            setAddPhoto(prev => {
                return [...prev, ...filename]
            })
        })
    }

    function handlerdelete(image) {
        setAddPhoto(prev => {
            return prev.filter(photo => photo !== image)
        })
    }

    function handlerselect(image) {
        setAddPhoto(prev => {
            return [image, ...prev.filter(photo => photo !== image)]
        })
    }

    return (
        <>
            <div className="flex  gap-2 mt-2">
                <input type='text' className="basis-4/5" placeholder=" .jpg link" value={PhotoLinks} onChange={ev => setPhotoLinks(ev.target.value)}></input>
                <button onClick={uploadPhoto} className="bg-red-400 rounded-2xl min-h-4 grow">Add photos</button>
            </div>

            <div className="mt-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                {AddPhoto.length > 0 && AddPhoto.map(image => {
                    return (
                        <div className="h-32 flex relative text-red-600" key={image}>
                            <img className="rounded-2xl w-full object-cover  " src={'http://localhost:4000/uploads/' + image} alt="image"></img>
                            <button className="cursor-pointer absolute top-0 right-0 bg-white rounded-2xl bg-opacity-40" onClick={() => handlerdelete(image)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {image === AddPhoto[0] &&

                                <button className="absolute bg-white rounded-2xl bg-opacity-40" onClick={ev => ev.preventDefault()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>

                                </button>

                            }

                            {image !== AddPhoto[0] &&
                                <button className="absolute bg-white rounded-2xl bg-opacity-40" onClick={() => handlerselect(image)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>

                                </button>}
                        </div>
                    )
                })}
                <label className="gap-2 h-32 cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex items-center justify-center">
                    <input type="file" multiple className="hidden" onChange={uploadPhotoFile} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    upload
                </label>
            </div>
        </>
    )
}