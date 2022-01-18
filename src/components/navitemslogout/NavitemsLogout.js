import React from 'react'
import UserIcon from '../../assets/images/user.png'
import { Common } from "../../redux/common";

const NavitemsLogout = ({wallet}) => {
    const {profileImg} = Common();
    return (
        <ul className='logout-nav-items'>
            <li>
                <div className="nav-item dropdown">
                    <a data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><span>{wallet?.account}</span><img src={ profileImg ? profileImg : UserIcon} className="avatar" alt="Avatar" /></a>
                    <div className="dropdown-menu">
                        <a  className="dropdown-item disconnect-button" onClick={()=> wallet?.reset()}>Disconnect</a>
                        <a href="/edit" className="dropdown-item">Edit Profile</a>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default NavitemsLogout
