import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import admin from "../../assets/admin.png"

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="" />
                    <p>Admin Pannel</p>
                </div>
                <img className='admin-profile' src={admin} alt="" />
            </div>
        </div>
    )
}

export default Navbar