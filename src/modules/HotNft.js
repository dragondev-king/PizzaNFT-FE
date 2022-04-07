import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { NFT_ADDRESS, AUCTION_ADDRESS } from "../config/contract";
import {
  AUCTIONcontractRead,
  NFTcontractRead,
} from "../config/contractConnect";
import { useNft } from "use-nft";
import HotAuction from "../components/hotauction/HotAuction";

function HotNft({ tokenId }) {
  const [nftavatar, setNftAvatar] = useState();
  const [ownername, setOwnerName] = useState();
  const [seller, setSeller] = useState("");
  const [buynowprice, setBuyNowPrice] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [downtime, setDownTime] = useState(0);
  const [contentType, setContentType] = useState();
  const [coverImage, setCoverImage] = useState()

  const { loading, error, nft } = useNft(NFT_ADDRESS, tokenId);

  useEffect(async () => {
    if (nft?.image) {
      try {
        const result = await axios.get(nft?.image)
        setContentType(result.headers['content-type'])
      } catch (err) {
        console.log(err)
      }
    }
  })

  useEffect(async () => {
    try {
      const auction = await AUCTIONcontractRead.pizzaAuctions(
        NFT_ADDRESS,
        tokenId
      );
      setSeller(auction.nftSeller);
      setHighestBid(ethers.utils.formatEther(auction?.nftHighestBid));
      setDownTime((new Date((parseInt(auction.createdAt, 10) * 1000))).getTime() + auction.auctionPeriod * 1000);
    } catch (err) { }
  }, []);

  // nft.loading is true during load.
  if (loading) return <>
    <div className="fa-3x">
      <i className="fas fa-spinner fa-pulse"></i>
    </div>
  </>;
  // nft.error is an Error instance in case of error.
  if (error || !nft) return <>Error.</>;

  try {
    (async () => {
      setBuyNowPrice(
        ethers.utils.formatEther(await NFTcontractRead.prices(tokenId))
      );
    })();

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API
        }/api/profile/${ethers.utils.getAddress(nft.owner)}`
      )
      .then((res) => {
        setNftAvatar(res.data[0]?.profileImg);
        setOwnerName(res.data[0]?.name);
        setCoverImage(res.data[0].coverImg)
      });
  } catch (err) { }

  if (nft?.owner === AUCTION_ADDRESS) {
    nft.owner = seller;
  }

  // You can now display the NFT metadata.
  return (
    <Link
      to={{
        pathname: `/details/${tokenId}`,
      }}
    >
      {
        contentType && (contentType.includes('audio') || contentType.includes('video')) ? (
          <HotAuction
            profileImg={nftavatar}
            ownername={ownername}
            nft={nft}
            buyprice={buynowprice}
            highestBid={highestBid}
            downtime={downtime}
            isImage={false}
            coverImage={coverImage}
          />
        ) : contentType && contentType.includes('image') && (
          <HotAuction
            profileImg={nftavatar}
            ownername={ownername}
            nft={nft}
            buyprice={buynowprice}
            highestBid={highestBid}
            downtime={downtime}
            isImage={true}
            coverImage={coverImage}
          />
        )
      }
    </Link>
  );
}

export default HotNft;
