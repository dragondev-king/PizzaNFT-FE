import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { Common } from "../../redux/common"
import { walletConnect } from "../../redux/actions"

const NavitemLogin = () => {
    const dispatch = useDispatch();
    const {account} = Common();

    useEffect( () => {
        if(localStorage.getItem('account')) {
            dispatch(walletConnect());
        }
    }, [account])

    return (
        <ul>
            <li className='wallet-connect' onClick={ ()=> dispatch(walletConnect()) }><a ><i className="fas fa-wallet"></i> Wallet Connect</a></li>
        </ul>
    )
}

export default NavitemLogin

