import React, { useState } from "react";
import Countdown from "react-countdown";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

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
}) => {
  const [loading, setLoading] = useState(true)
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
          <>
            <div style={{display: loading ? "none" : "block"}}>
              <img src={nft?.image} alt="" className="img-responsive" onLoad={() => setLoading(false)}/>
            </div>
            <div style={{display: loading ? "block !important" : "none"}}>
              <Skeleton height={220} highlightColor='#aaaaaa' borderRadius='1.25rem'/>
            </div>
          </>
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
            <h2>{nft?.name || <Skeleton highlightColor='#aaaaaa' />}</h2>
            {
              (Number(highestBid) > Number(buyprice))? (
                <h3>Highest Bid: {Number(highestBid) || <Skeleton highlightColor='#aaaaaa' />} BNB</h3>
              ) : (
                <h3>Buy Price: {Number(buyprice) || <Skeleton highlightColor='#aaaaaa' />} BNB</h3>
              )
            }
            <h3>{ownername ? ownername : "Unknown" || <Skeleton highlightColor='#aaaaaa' />}</h3>
          </div>
          <div className="artist-details">
            <div className="auctionartist">
              <AvatarImage
                profileImg={profileImg}
                nft={nft}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotAuction;
