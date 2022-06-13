import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ReactPlayer from "react-player";
import AvatarImage from "../avatarimage/AvatarImage";

const ExploreImage = ({ profileImg, ownername, nft, buyprice, isImage }) => {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <div
        className="auction-image exd-image"
        style={{ width: "250px", height: "250px", margin: "10px 10px 70px" }}
      >
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
          <div style={{height: "230px"}} className="img-responsive">
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
        <div className="details-container">
          <div className="name-details">
            <h3>{Number(buyprice) || <Skeleton />} BNB</h3>
            <h2>{nft?.name || <Skeleton />}</h2>
            <h3>{ownername ? ownername : "unknown"  || <Skeleton />}</h3>
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
    </>
  );
};

export default ExploreImage;
