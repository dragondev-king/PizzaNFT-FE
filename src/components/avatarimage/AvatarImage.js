import React from 'react'
import { Link } from 'react-router-dom'
import AvatarImages from '../../assets/images/artist-avatar.jpg'

const AvatarImage = ({profileImg, ownername, nft}) => {
    return (
        <>
            <div className="avatarimage">
                <Link to={{pathname: '/profile', state:{nft, profileImg: profileImg, ownername: ownername}}} ><img src={profileImg ? profileImg : AvatarImages} alt="" /></Link>
            </div>
        </>
    )
}

export default AvatarImage
