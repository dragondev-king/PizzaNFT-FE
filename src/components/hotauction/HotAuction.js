import React from 'react'
import Countdown from 'react-countdown'
import NftSample from '../../assets/images/hot-auction.jpeg'
import AvatarImage from '../avatarimage/AvatarImage'

const HotAuction = ({profileImg, ownername, nft, buyprice, hightbid, downtime}) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Auction End</span>;
        } else {
            return <>
                <span>{days} Days, {hours} Hours, {minutes} Minutes, {seconds}s</span>
            </>
        }
    };
    return (
        <div>
            <div className="auction-image exd-image">
                <img src={nft?.image} alt="" className="img-responsive" />
                <div className="auction-bar">
                    {
                        Number(hightbid) ? <Countdown  date={ new Date(Number(downtime)) }  renderer={renderer}/> : <span>No Bid</span>
                    }
                </div>
                <div className="details-container">
                    <div className="name-details">
                        <h2>{ nft?.name }</h2>
                        <h3>Highest Bid: {hightbid} $PIZZA</h3>
                        <h3>{ ownername ? ownername : "Unknown" }</h3>
                    </div>
                    <div className="artist-details">
                        <div className="auctionartist">
                            <AvatarImage profileImg={profileImg} ownername={ownername} nft={nft} buyprice={buyprice} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotAuction
