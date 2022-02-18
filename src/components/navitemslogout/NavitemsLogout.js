import React from 'react'
import { useDispatch } from "react-redux"
import UserIcon from '../../assets/images/user.png'
import { Common } from "../../redux/common"
import { walletDisconnect } from "../../redux/actions"

const NavitemsLogout = () => {
    const dispatch = useDispatch();
    const {profileImg, account} = Common();

    return (
        <ul className='logout-nav-items'>
            <li>
                <div className="nav-item dropdown">
                    <a data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><span>{account}</span><img src={ profileImg ? profileImg : UserIcon} className="avatar" alt="Avatar" /></a>
                    <div className="dropdown-menu">
                        <a  className="dropdown-item disconnect-button" onClick={()=> dispatch( walletDisconnect() )}>Disconnect</a>
                        <a href="/edit" className="dropdown-item">Edit Profile</a>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default NavitemsLogout
