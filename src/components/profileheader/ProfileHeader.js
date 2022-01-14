import React, { useState } from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const ProfileHeader = ({nft}) => {
    const [alertmessage, setAlertmessage] = useState("");
    const copydata = () => {
        navigator.clipboard.writeText(nft?.nft?.owner)
    }

    const allertdata = () => {
        setAlertmessage("Copied")
        setTimeout(() => {
            setAlertmessage("")
        }, 700)
    }
    return (
        <>
            <div className="container">
                <div className="profile-avatar-image-container">
                    <div className="profile-avatar">
                        <div className="profile-image">
                            <AvatarImage profileImg={nft?.profileImg}/>
                        </div>
                        <div className="profile-image-details">
                            <h2>{nft?.ownername ? nft?.ownername : "unknown"}</h2>
                            <button>Follow</button>
                        </div>
                    </div>
                    <div className="contract-container">
                        <h6>{nft?.nft?.owner}</h6>
                        <button onClick={() => { copydata(); allertdata(); }} ><i className="far fa-copy"></i></button><span>{alertmessage}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader
