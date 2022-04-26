import React, { useState } from 'react'

import BnbImage from '../../assets/images/bnb-coin.png'
import Mint from '../../assets/images/mint.png'
import Buy from '../../assets/images/buy.png'
import Bid from '../../assets/images/bid.png'
import Transfer from '../../assets/images/transfer.png'
import HowToVidoes from '../../assets/images/how-to-videos.png'

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
                            <div className="hero-text homepage">
                                <h1>Explore our Pizza NFT Marketplace on the Binance Blockchain.</h1>
                                <h4>
                                    Mint Only for validation on BSC Blockchain. Creators: Chose Status of NFTs to Buy Now Price or NFTs for bidding in Auction. Creators Add up to 20% Royalties. Buyers: Collect any NFTS using BNB (smart chain bep20) as payment. Creators can Mint for as low as $5usdt value (4.5M $Pizza* native tokens). See FAQ.
                                </h4>
                                <img src={HowToVidoes} className='how-to-video-img' alt="" />
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
