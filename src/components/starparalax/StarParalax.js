import React, { useState } from 'react'

import BnbImage from '../../assets/images/bnb-coin.png'

const StarParalax = () => {

    return (
        <div className="starparalax">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="hero-text">
                                <h1>Lorem Ipsum is simply dummy
                                    text of the printing</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                </p>
                                <div className="hero-buttons">
                                    <a href="#"><i className="fas fa-fire"></i> Explore more</a>
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
