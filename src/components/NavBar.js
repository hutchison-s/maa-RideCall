import './NavBar.css'
import { useState } from 'react'

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <ul id="navBar">
            <a href="/">Manage Ride Numbers</a>
            <a href="/caller">Call Rides</a>
            <a href="/rides">Display Rides</a>
            {menuOpen 
                ? <div className='open' onClick={()=>{setMenuOpen(!menuOpen)}}>&lt;</div> 
                : <div className='closed' onClick={()=>{setMenuOpen(!menuOpen)}}>=</div>
            }
        </ul>
    )
}