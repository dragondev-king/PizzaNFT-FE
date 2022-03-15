import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AvatarImage from "../avatarimage/AvatarImage";
import { Common } from "../../redux/common";
import { getFollow, addFollow } from "../../redux/actions";
import CoverImage from "../../assets/images/cover-image.jpeg";
import { showNotification } from "../../utils/helpers";

const ProfileHeader = ({ nft }) => {
  const dispatch = useDispatch();
  const [followState, setFollowState] = useState();
  const { account, followInfos } = Common();
  const [alertmessage, setAlertmessage] = useState("");

  useEffect(() => {
    dispatch(getFollow(nft?.nft?.owner));
  }, []);

  const copydata = () => {
    navigator.clipboard.writeText(nft?.nft?.owner);
  };
  const allertdata = () => {
    setAlertmessage("Copied");
    setTimeout(() => {
      setAlertmessage("");
    }, 700);
  };

  const addFollowAction = () => {
    const check = followInfos.filter((item) => item.followAccount === account);
    if (check.length !== 0) {
      showNotification({
        title: "Warning",
        message: "You've already followed",
        type: "warning",
        insert: "top",
        container: "top-right",
      });
    } else {
      dispatch(addFollow(nft?.nft?.owner, account));
    }
  };

  return (
    <>
      <div className="container">
        <div className="cover-image-container">
          <img src={nft?.coverImage} alt="" />
        </div>
        <div className="profile-avatar-image-container">
          <div className="profile-avatar">
            <div className="profile-image">
              <AvatarImage
                profileImg={nft?.profileImg}
                ownername={nft?.ownername}
                nft={nft?.nft}
                coverImage={nft?.coverImage}
              />
            </div>
            <div className="profile-image-details">
              <h2>{nft?.ownername ? nft?.ownername : "unknown"}</h2>
              {account !== nft?.nft?.owner && account ? (
                <button onClick={addFollowAction}>Follow</button>
              ) : (
                <></>
              )}
              <button
                style={{ padding: "3px 10px", marginLeft: "5px" }}
                disabled
              >
                {followInfos?.length}
              </button>
            </div>
          </div>
          <div className="contract-container">
            <h6>{nft?.nft?.owner}</h6>
            <button
              onClick={() => {
                copydata();
                allertdata();
              }}
            >
              <i className="far fa-copy"></i>
            </button>
            <span>{alertmessage}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
