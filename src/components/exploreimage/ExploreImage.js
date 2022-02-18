import React from 'react'
import AvatarImage from '../avatarimage/AvatarImage'

const ExploreImage = ({profileImg, ownername, nft, buyprice }) => {
    return (
        <>
            <div className="auction-image exd-image" style={{"width":'250px', 'height':'250px','margin':'10px 10px 70px'}}>
                <img src={nft?.image} alt="" className="img-responsive" />
                <div className="details-container">
                    <div className="name-details">
                        <h3>{ Number(buyprice).toFixed(2) } BNB</h3>
                        <h2>{nft?.name}</h2>
                        <h3>{ownername ? ownername : "unknown"}</h3>
                    </div>
                    <div className="artist-details">
                        <div className="auctionartist">
                            <AvatarImage profileImg={profileImg} ownername={ownername} nft={nft} buyprice={buyprice} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExploreImage
