import React from 'react'
import Logo from '../../assets/images/logo.png'


const Footer = () => {
    return (
        <div>
            <div className="copyrights">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <a href="#"><img src={Logo} alt="Logo" /></a>
                            <h3>FOLLOW US ON</h3>
                            <div className="footer-social-icons">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-discord"></i></a>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3>INFORMATION</h3>
                            <a href="https://pizza-nft.com/home/#contactus" target="_blank">Contact Us</a>
                            <a href="#">Newsletter</a>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc7F6Xt4TL151brnUyW6cUjKwP0TDiAeW3iUQllrVnwQQ6Y2Q/viewform" target="_blank">Subscriptions</a>
                        </div>
                        <div className="col-md-3">
                            <h3>LANGUAGE</h3>
                            <div class="google-translate-div ">
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
