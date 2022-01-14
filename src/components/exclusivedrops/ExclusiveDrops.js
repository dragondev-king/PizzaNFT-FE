import React from 'react'
import NftSample from '../../assets/images/nft-sample.jpeg'

const ExclusiveDrops = () => {
    return (
        <div>
            <div className="exd-image">
                <img src={NftSample} alt="" className="img-responsive" />
                <h4 className="nft-title">
                    ASTRO JOCK JORDAN
                </h4>
            </div>
        </div>
    )
}

export default ExclusiveDrops
