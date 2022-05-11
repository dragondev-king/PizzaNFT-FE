import React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import AvatarImage from '../avatarimage/AvatarImage'

const ArtistAvatar = ({ info }) => {
    return (
        <div className="avatar-container">
            <AvatarImage profileImg={info[1]?.profileImg} nft={{owner: info[0]}}/>
            <div className="avatar-description">
                <h4>{ info[1].name ? info[1].name : "Unknown" }</h4>
                <p><span>{ info[1].price || <Skeleton highlightColor='#aaaaaa' /> }</span> BNB</p>
            </div>
        </div>
    )
}

export default ArtistAvatar
