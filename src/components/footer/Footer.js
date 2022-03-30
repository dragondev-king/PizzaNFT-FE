import React from 'react'
import Logo from '../../assets/images/logo.png'


const Footer = () => {
    return (
        <div>
            <div className="copyrights">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <a href="http://pizzanft.studio"><img src={Logo} alt="Logo" /></a>
                            <h3>FOLLOW US ON</h3>
                            <div className="footer-social-icons">
                                <a target="_blank" href="https://www.facebook.com/PizzaNFT/" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                <a target="_blank" href="https://t.me/pizzanft" className="social-icon"><i className="fab fa-telegram-plane"></i></a>
                                <a target="_blank" href="https://twitter.com/pizzaNFT2E" className="social-icon"><i className="fab fa-twitter"></i></a>
                                <a target="_blank" href="https://www.instagram.com/pizzanftofficial/" className="social-icon"><i className="fab fa-instagram"></i></a>
                                <a target="_blank" href="https://www.tiktok.com/@pizzanftofficial?" className="social-icon"><i className="fab fa-tiktok"></i></a>
                                <a target="_blank" href="https://discord.io/pizzanft" className="social-icon"><i className="fab fa-discord"></i></a>
                                <a target="_blank" href="https://www.youtube.com/channel/UCDlGQA5bzWvL994MdGLTu_g" className="social-icon"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3>INFORMATION</h3>
                            <a href="https://contact.pizza-nft.com/" target="_blank">Contact Us</a>
                            <a href="https://medium.com/@PIZZANFTOFFICIAL" target="_blank">Newsletter</a>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc7F6Xt4TL151brnUyW6cUjKwP0TDiAeW3iUQllrVnwQQ6Y2Q/viewform" target="_blank">Subscriptions</a>
                        </div>
                        <div className="col-md-3">
                            <h3>LANGUAGE</h3>
                            <div className="google-translate-div ">
                                <div id="google_translate_element"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
