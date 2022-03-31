import React from "react";
import AvatarImage from "../avatarimage/AvatarImage";

const Owner = ({ state, coverImage }) => {
  return (
    (
      <>
        <div className="main-bid-container">
          <div className="bid-avatar-image">
            <AvatarImage
              profileImg={state?.profileImg}
              ownername={state?.ownername}
              nft={state?.nft}
              coverImage={coverImage}
            />
          </div>
          <div className="bid-description">
            <h4>{state?.nft?.name}</h4>
            <h5>{state?.ownername}</h5>
          </div>
        </div>
      </>
    )
  );
};

export default Owner;
