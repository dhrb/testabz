import React from 'react'
import headerLogo from './../../assets/img/Logo.svg'
import './headerStyle.scss'

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={headerLogo} className="" alt="logo" />
            </div>
            <div className="headersButtons">
                <button className="headerBtn">Users</button>
                <button className="headerBtn">Sign Up</button>
            </div>
        </div>
    )
}

export default Header
