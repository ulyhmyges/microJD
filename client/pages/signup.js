import {useState} from "react";
import axios from "axios";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState('');
    const handleTitle = (event) => {
        setLogin(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://192.168.240.4:3001/auth/subscribe', {
            login, password, email
        }).catch(console.error);
        setLogin('');
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <div className={'form-group'}>
                <label className={'form-control'}>Login</label>
                <input value={login} onChange={(event) => setLogin(event.target.value)}/>
            </div>
            <div className={'form-group'}>
                <label className={'form-control'}>Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={'form-group'}>
                <label className={'form-control'}>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button className={'btn btn-primary'}>Sign up</button>
        </form>
    )
}