import React from 'react';
import Logo from '../../assets/images/logo.png';
import BuyButton from '../../assets/images/buy-button.png'
import NavitemLogin from '../navItemlogin/NavitemLogin';
import NavitemsLogout from '../navitemslogout/NavitemsLogout';
import { Common } from "../../redux/common";

const NavBar = () => {

    const { account } = Common();

    return (
        <div className="main-nav-bar">
            <div className="container">
                <div className="nav-container">
                    <div className="logo-container">
                        <a href="/"><img src={Logo} alt="Logo" /></a>
                        <a href="https://pancakeswap.finance/swap?outputCurrency=0xb07905396A419B121213efe1d17cfD0ff20aE597">
                            <img src={BuyButton} className='nav-buy-button' alt="" />
                        </a>
                    </div>
                    <div className="faq-container">
                        <a href="http://www.nftsmarket.cc/" target="_blank"><h2>FAQ</h2></a>
                    </div>
                    <div className="nav-bar-items">
                        {
                            account ?
                                <NavitemsLogout /> :
                                <NavitemLogin />
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

export default NavBar
