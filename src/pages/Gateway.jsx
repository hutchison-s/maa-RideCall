import axios from 'axios'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from '../pages/App';
import DisplayFamilies from '../pages/DisplayFamilies';
import Caller from '../pages/Caller';
import { useState, useEffect } from 'react';
import './Gateway.css'

export default function Gateway() {
    const [auth, setAuth] = useState(false)

    function getAuth(credentials) {
    axios.post("http://localhost:5000/families/login", credentials)
        .then(res => {res.data.auth === "authorized" && setAuth(true);})
        .catch(err => {
            console.log("Error in login process:", err)
        })
    }

    useEffect(()=>{
    const storedCreds = JSON.parse(sessionStorage.getItem("gatewayAuth"));
    storedCreds && getAuth(storedCreds)
    }, [])

    const router = createBrowserRouter([
    {
        path: "/",
        element: auth ? <App /> : <Gateway auth={auth} setAuth={setAuth} />
    },
    {
        path: "/rides",
        element: auth ? <DisplayFamilies /> : <Gateway auth={auth} setAuth={setAuth} />
    },
    {
        path: "/caller",
        element: auth ? <Caller /> : <Gateway auth={auth} setAuth={setAuth} />
    }
    ]);

    function onSubmit(e) {
        e.preventDefault();
        const creds = {
            user: e.target.user.value,
            pass: e.target.pass.value
        }
        axios.post("http://localhost:5000/families/login", creds)
            .then(res => {
                console.log(res.data)
                if (res.data.auth === "authorized") {
                    setAuth(true);
                    sessionStorage.setItem("gatewayAuth", JSON.stringify(creds))
                } else {
                    e.target.classList.add("wrong");
                    setTimeout(()=>{
                        e.target.reset()
                        e.target.classList.remove("wrong")
                    }, 400)
                }
            })
            .catch(err => {
                console.log("Error in login process:", err)
            })
    }

    return (
        <>
            {auth
            ? <RouterProvider router={router} />
            : <main id='loginPage'>
                <form id='loginForm' onSubmit={onSubmit} style={{backgroundColor: 'white', border: '1px solid red', borderRadius: '1rem', boxShadow: '0 0 10px red inset, 2px 2px 20px rgba(250,250,250,0.4)', padding: '2rem', width: 'fit-content', position: 'absolute', inset: '50%', translate: '-50% -50%', height: 'fit-content'}}>
                    <h2>Login:</h2>
                    <label htmlFor='userLogin'>Username: </label><input id='userLogin' name='user' type='text'/>
                    <br></br><br></br>
                    <label htmlFor='passLogin'>Password: </label><input id='passLogin' name='pass' type='password'/>
                    <button type='submit' style={{marginTop: '1rem'}}>Submit</button>
                </form>
            </main>}
        </>
        
    )
}