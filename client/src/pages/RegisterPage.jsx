import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const registerUser = async (ev) => {
        ev.preventDefault();
        await axios.post('/register', {
            name,
            email,
            password
        }
        ).then(res => {
            alert('registration successful')
            console.log(res.data)
        }
    ).catch(err => {
            if(err.response.status === 422) alert(err.response.data)
            else{
            alert('registration failed please try agian later')
            console.log(err.response)} });
    
    }
    return (
        <div className="mt-4 flex items-center justify-center grow">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="Alex" value={name} onChange={ev => setname(ev.target.value)}></input>
                    <input type="text" placeholder="your@gmail.com" value={email} onChange={ev => setemail(ev.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={ev => setpassword(ev.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center text-gray-400">Already have an account? <Link className="underline font-bold text-black" to={'/login'}>Login</Link>    </div>
                </form>
            </div>
        </div>
    )
}