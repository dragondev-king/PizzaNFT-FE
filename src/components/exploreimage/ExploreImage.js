import React from "react";
import ReactPlayer from "react-player";
import AvatarImage from "../avatarimage/AvatarImage";

const ExploreImage = ({ profileImg, ownername, nft, buyprice, isImage }) => {
  return (
    <>
      <div
        className="auction-image exd-image"
        style={{ width: "250px", height: "250px", margin: "10px 10px 70px" }}
      >
        {isImage ? (
          <img src={nft?.image} alt="" className="img-responsive" />
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
            <h3>{Number(buyprice).toFixed(5)} BNB</h3>
            <h2>{nft?.name}</h2>
            <h3>{ownername ? ownername : "unknown"}</h3>
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
