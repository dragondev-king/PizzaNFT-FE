import React from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const ArtistAvatar = ({ info }) => {
    return (
        <div className="avatar-container">
            <AvatarImage profileImg={info[1]?.profileImg} ownername={info[1]?.name} nft={{owner: info[0]}}/>
            <div className="avatar-description">
                <h4>{ info[1].name ? info[1].name : "Unknown" }</h4>
                <p><span>{ info[1].price.toFixed(3) }</span> BNB</p>
            </div>
        </div>
    )
}

export default ArtistAvatar
