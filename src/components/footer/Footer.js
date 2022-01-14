import React from 'react'
import Logo from '../../assets/images/logo.png'


const Footer = () => {
    return (
        <div>
            <div className="copyrights">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <a href="#"><img src={Logo} alt="Logo" /></a>
                            <h3>FOLLOW US ON</h3>
                            <div className="footer-social-icons">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-discord"></i></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h3>PIZZA-NFTS</h3>
                            <a href="#">NFTs</a>
                            <a href="#">News</a>
                            <a href="#">Blog</a>
                        </div>
                        <div className="col-md-3">
                            <h3>INFORMATION</h3>
                            <a href="#">Terms of service</a>
                            <a href="#">Privacy policy</a>
                        </div>
                        <div className="col-md-3">
                            <h3>LANGUAGE</h3>
                            <select className="form-control">
                                <option>English</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
