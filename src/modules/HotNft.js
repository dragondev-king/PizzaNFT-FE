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

  const { loading, error, nft } = useNft(NFT_ADDRESS, tokenId);

  useEffect( async () => {
    if(nft?.image) {
      try {
        const result = await axios.get(nft?.image)
        setContentType(result.data['content-type'])
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
      setDownTime(auction.createdAt * 1000 + auction.auctionPeriod * 1000);
    } catch (err) {}
  }, []);

  // nft.loading is true during load.
  if (loading) return <>Loading…</>;
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
        `${
          process.env.REACT_APP_BACKEND_API
        }/api/profile/${ethers.utils.getAddress(nft.owner)}`
      )
      .then((res) => {
        setNftAvatar(res.data[0]?.profileImg);
        setOwnerName(res.data[0]?.name);
      });
  } catch (err) {}

  if (nft?.owner === AUCTION_ADDRESS) {
    nft.owner = seller;
  }

  // You can now display the NFT metadata.
  return (
    <Link
      to={{
        pathname: "/details",
        state: {
          profileImg: nftavatar,
          ownername: ownername,
          tid: tokenId,
          buyprice: buynowprice,
          nft,
        },
      }}
    >
      {
        contentType === 'audio/mpeg' ? (
          <HotAuction
            profileImg={nftavatar}
            ownername={ownername}
            nft={nft}
            buyprice={buynowprice}
            highestBid={highestBid}
            downtime={downtime}
            isImage={false}
          />
        ) : (
        <HotAuction
          profileImg={nftavatar}
          ownername={ownername}
          nft={nft}
          buyprice={buynowprice}
          highestBid={highestBid}
          downtime={downtime}
          isImage={true}
        />
        )
      }
    </Link>
  );
}

export default HotNft;
