import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";


export default function LoginPage() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');  
    const [redirect, setredirect] = useState(false);
    const {setuser} = useContext(UserContext);
    const Submithandler = async (ev) => {
        ev.preventDefault();
        try{
       const response = await axios.post('/login', {
            email,
            password
        }
    )
    setuser(response.data);
    setredirect(true); 
    alert('login successful')
    
}catch(err){
    alert('login failed')
}
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 flex items-center justify-center grow">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">LOGIN</h1>
                <form className="max-w-md mx-auto" onSubmit={Submithandler}>
                    <input type="text" 
                    placeholder="your@gmail.com"
                    value={email}
                    onChange={ev => setemail(ev.target.value)} />
                    <input type="password"
                     placeholder="password"
                     value={password}
                     onChange={ev => setpassword(ev.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center text-gray-400">Dont have an account yet? <Link className="underline font-bold text-black" to={'/register'}>Register now</Link>    </div>
                </form>
            </div>
        </div>
    )
}