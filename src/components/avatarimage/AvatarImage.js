import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import AvatarImages from '../../assets/images/artist-avatar.jpg'

const AvatarImage = ({profileImg, nft}) => {
    
    return (
        <>
            <div className="avatarimage">
                <Link to={{pathname: `/profile/${nft?.owner}`}} ><img src={profileImg ? profileImg : AvatarImages || <Skeleton highlightColor='#aaaaaa' />} alt="" style={{'width':'100px', 'maxHeight':'100px'}}/></Link>
            </div>
        </>
    )
}

export default AvatarImage
