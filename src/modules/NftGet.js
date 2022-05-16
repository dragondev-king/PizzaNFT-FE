import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { NFT_ADDRESS, AUCTION_ADDRESS } from "../config/contract";
import {
  AUCTIONcontractRead,
  NFTcontractRead,
} from "../config/contractConnect";
import { useNft } from "use-nft";
import ExploreImage from "../components/exploreimage/ExploreImage";

function Nft({ tokenId, category, searchText = "" }) {
  const [nftavatar, setNftAvatar] = useState();
  const [ownername, setOwnerName] = useState();
  const [seller, setSeller] = useState("");
  const [buynowprice, setBuyNowPrice] = useState(0);
  const [contentType, setContentType] = useState();
  const [coverImage, setCoverImage] = useState()

  const { loading, error, nft } = useNft(NFT_ADDRESS, tokenId);
  useEffect(async () => {
    try {
      const auction = await AUCTIONcontractRead.pizzaAuctions(
        NFT_ADDRESS,
        tokenId
      );
      setSeller(auction.nftSeller);
    } catch (err) { }
  }, []);

  useEffect(async () => {
    if (nft?.image) {
      try {
        const result = await axios.get(nft?.image)
        setContentType(result.headers['content-type'])
      } catch (err) {
        console.log(err)
      }
    }
  });

  // nft.loading is true during load.
  if (loading) return <Skeleton width={250} height={320} highlightColor='#aaaaaa' borderRadius='1rem'/>
  // nft.error is an Error instance in case of error.
  if (error || !nft) return <>Error</>;

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

  let flag = false;
  if (
    String(nft?.name).includes(searchText) ||
    String(ownername).includes(searchText) ||
    searchText === tokenId ||
    searchText === ""
  ) {
    flag = true;
  }

  if (flag) {
    if (category === "All" || nft?.rawData?.type === category) {
      return (
        <Link
          to={{
            pathname: `/details/${tokenId}`,
          }}
          style={{textDecoration:"none"}}
        >{
            contentType && (contentType.includes('audio') || contentType.includes('video')) ? (
              <>
                <ExploreImage
                  profileImg={nftavatar}
                  ownername={ownername}
                  nft={nft}
                  buyprice={buynowprice}
                  isImage={false}
                  coverImage={coverImage}
                />
              </>
            ) : contentType && contentType.includes('image') && (
              <ExploreImage
                profileImg={nftavatar}
                ownername={ownername}
                nft={nft}
                buyprice={buynowprice}
                isImage={true}
                coverImage={coverImage}
              />
            )
          }

        </Link>
      );
    }
  }

  return <></>;
}

export default Nft;
