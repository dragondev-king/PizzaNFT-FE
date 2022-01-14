import React from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const ArtistAvatar = () => {
    return (
        <div className="avatar-container">
            <AvatarImage />
            <div className="avatar-description">
                <h4>1. TestName</h4>
                <p><span>559.78</span> BNB</p>
            </div>
        </div>
    )
}

export default ArtistAvatar
