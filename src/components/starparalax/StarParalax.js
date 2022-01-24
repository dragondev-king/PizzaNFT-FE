import React, { useState } from 'react'

import BnbImage from '../../assets/images/bnb-coin.png'
import Mint from '../../assets/images/mint.png'
import Buy from '../../assets/images/buy.png'
import Bid from '../../assets/images/bid.png'
import Transfer from '../../assets/images/transfer.png'

const StarParalax = () => {

    return (
        <div className="starparalax">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title">
                <div className="container">
                    <div className="row hero-banner">
                        <div className="col-md-8">
                            <div className="hero-text">
                                <h1>How to Videos </h1>
                                <a href="https://www.youtube.com/channel/UCDlGQA5bzWvL994MdGLTu_g/videos" target="_blank"><img src={Mint} alt="" /></a>
                                <a href="https://www.youtube.com/channel/UCDlGQA5bzWvL994MdGLTu_g/videos" target="_blank"><img src={Buy} alt="" /></a>
                                <a href="https://www.youtube.com/channel/UCDlGQA5bzWvL994MdGLTu_g/videos" target="_blank"><img src={Bid} alt="" /></a>
                                <a href="https://www.youtube.com/channel/UCDlGQA5bzWvL994MdGLTu_g/videos" target="_blank"><img src={Transfer} alt="" /></a>
                                <div className="hero-buttons">
                                    <a href="#exlpore-more"><i className="fas fa-fire"></i> Explore more</a>
                                    <a href="/create"><i className="fas fa-edit"></i> Create</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={BnbImage} alt="" className='img-responsive' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StarParalax
