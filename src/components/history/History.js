import React from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const History = () => {
    return (
        <>
            <div className="main-bid-container">
                <div className="bid-avatar-image">
                    <AvatarImage />
                </div>
                <div className="bid-description">
                    <h4>Test Name</h4>
                    <h5>Auction Created</h5>
                    <h6>4 Days ago</h6>
                </div>
            </div>
        </>
    )
}

export default History
