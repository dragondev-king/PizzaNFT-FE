import React from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const Bidder = () => {
    return (
        <>
            <div className="main-bid-container">
                <div className="bid-avatar-image">
                    <AvatarImage />
                </div>
                <div className="bid-description">
                    <h4>0x3ee3d5Be2e8A7b29D395Ca8E5F380B2d277A6900</h4>
                    <h5>Bid <span>0.022 BNB</span></h5>
                    <h6>30 Dec, 1:47:56 pm</h6>
                </div>
            </div>
        </>
    )
}

export default Bidder
