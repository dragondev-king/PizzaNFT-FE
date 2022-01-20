import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { ethers } from 'ethers';
import Logo from '../../assets/images/logo.png';
import NavitemLogin from '../navItemlogin/NavitemLogin';
import NavitemsLogout from '../navitemslogout/NavitemsLogout';
import { useWallet, UseWalletProvider } from 'use-wallet';
import { walletConnect, userInfo } from "../../redux/actions";

const App = () => {
    const wallet = useWallet();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        dispatch(walletConnect(wallet));
        if (flag) {
            localStorage.setItem('connectStatus', wallet?.status);
        } else {
            localStorage.getItem('connectStatus') === 'connected' ? wallet?.connect() : wallet?.reset();
        }
        setFlag(true);

        if (wallet?.status === "connected") {
            dispatch(userInfo(ethers.utils.getAddress(wallet?.account)));
        }
    }, [wallet?.status])

    return (
        <div className="main-nav-bar">
            <div className="container">
                <div className="nav-container">
                    <div className="logo-container">
                        <a href="/"><img src={Logo} alt="Logo" /></a>
                        <a className="buy-pizza-button" href="https://pancakeswap.finance/swap?outputCurrency=0xb07905396A419B121213efe1d17cfD0ff20aE597" target="_blank">
                            BUY $PIZZA
                        </a>
                    </div>
                    <div className="nav-bar-items">
                        {
                            wallet?.status === "connected" ?
                                <NavitemsLogout wallet={wallet} /> :
                                <NavitemLogin wallet={wallet} />
                        }
                    </div>

                    {/* <div className="mobile-nav">
                        <nav className="navbar navbar-inverse">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="/"><img src={Logo} alt="Logo" /></a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav">
                                    <li><a href="/howtobuy">How To Buy</a></li>
                                    <li><a href="/home/#roadmap">Roadmap</a></li>
                                    <li><a href="/documents-audits">Documents & Audits</a></li>
                                    <li><a target="_blank" href="http://shop.safe-pizza.com">Shop</a></li>
                                    <li><a href="/faq">FAQ</a></li>
                                    <li><a href="/home/#contactus">Contact</a></li>
                                    <li><a href="https://poocoin.app/tokens/0x72eb1afddb5652e0f5c7b9a6cc1c3241348b16c6">Charts</a></li>
                                    <li><a href="/team">Team</a></li>
                                    <li><a href="/media">Media</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
const NavBar = () => {
    return (
        <UseWalletProvider chainId={process.env.REACT_APP_CHAIN_ID}>
            <App />
        </UseWalletProvider>
    )
}
export default NavBar
