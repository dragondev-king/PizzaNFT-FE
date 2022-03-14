import React from "react";
import Countdown from "react-countdown";
import ReactPlayer from "react-player";
import { Common } from "../../redux/common";
import AvatarImage from "../avatarimage/AvatarImage";

const HotAuction = ({
  profileImg,
  ownername,
  nft,
  buyprice,
  highestBid,
  downtime,
  isImage,
  coverImage
}) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Auction is Ended</span>;
    } else {
      return (
        <>
          <span>
            {days} Days, {hours} Hours, {minutes} Minutes, {seconds}s
          </span>
        </>
      );
    }
  };
  return (
    <div>
      <div className="auction-image exd-image">
        {isImage ? (
          <img src={nft?.image} alt="" className="img-responsive" />
        ) : (
          <div style={{height: "240px"}}>
            <ReactPlayer
              width="100%"
              height="230px"
              url={nft?.image}
              playing={false}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
              controls
            />
          </div>
        )}
        <div className="auction-bar">
          {Number(highestBid) === Number(buyprice) && (
            <>
              <span>No Bid</span>
              <br></br>
            </>)}
          <Countdown date={downtime} renderer={renderer} />
        </div>
        <div className="details-container">
          <div className="name-details">
            <h2>{nft?.name}</h2>
            {
              (Number(highestBid) > Number(buyprice))? (
                <h3>Highest Bid: {Number(highestBid).toFixed(5)} BNB</h3>
              ) : (
                <h3>Buy Price: {Number(buyprice).toFixed(5)} BNB</h3>
              )
            }
            <h3>{ownername ? ownername : "Unknown"}</h3>
          </div>
          <div className="artist-details">
            <div className="auctionartist">
              <AvatarImage
                profileImg={profileImg}
                ownername={ownername}
                nft={nft}
                buyprice={buyprice}
                coverImage={coverImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotAuction;
