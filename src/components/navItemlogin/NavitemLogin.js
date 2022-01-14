import React from 'react'

const NavitemLogin = ({wallet}) => {

    return (
        <ul>
            <li className='wallet-connect' onClick={ ()=> wallet?.connect() }><a ><i className="fas fa-wallet"></i> Wallet Connect</a></li>
        </ul>
    )
}

export default NavitemLogin
