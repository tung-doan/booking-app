import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Pagenav from "./AccountpageNav";
import PlacesPage from "./placesPage";


export default function AccountPage() {
    const [redirect, setredirect] = useState(null)
    const { ready, user, setuser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) subpage = 'profile';

    async function logout() {
        await axios.post('/logout');
        setredirect('/');
        setuser(null);
    }

    if (!ready) {
        return <div>Loading...</div>
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
         <div>
        <Pagenav />
            {subpage === 'profile' && (
                <div className="text-center mx-auto max-w-lg">
                    logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2 ">logout</button>

                </div>)}
            {subpage === 'places' && <PlacesPage />}
        </div>
    )
}