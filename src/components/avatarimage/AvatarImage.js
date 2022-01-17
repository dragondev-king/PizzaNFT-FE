import React from 'react'
import { Link } from 'react-router-dom'
import AvatarImages from '../../assets/images/artist-avatar.jpg'

const AvatarImage = ({profileImg, ownername, nft, buyprice}) => {
    return (
        <>
            <div className="avatarimage">
                <Link to={{pathname: '/profile', state:{nft, profileImg: profileImg, ownername: ownername, buyprice:buyprice}}} ><img src={profileImg ? profileImg : AvatarImages} alt="" style={{'width':'100px', 'maxHeight':'100px'}}/></Link>
            </div>
        </>
    )
}

export default AvatarImage
