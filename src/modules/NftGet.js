import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {ethers} from 'ethers'
import {
    NFT_ADDRESS,
    AUCTION_ADDRESS,
  } from "../config/contract"
import {AUCTIONcontractRead, NFTcontractRead} from "../config/contractConnect"
import { useNft } from "use-nft"
import ExploreImage from '../components/exploreimage/ExploreImage'

function Nft({ tokenId, category, searchText="" }) {
    const [nftavatar, setNftAvatar] = useState();
    const [ownername, setOwnerName] = useState();
    const [owner, setOwner] = useState("");
    const [buynowprice, setBuyNowPrice] = useState(0);

    const { loading, error, nft } = useNft(
        NFT_ADDRESS,
        tokenId
    )
    
    useEffect(async () => {
        try {
            setOwner(await AUCTIONcontractRead.ownerOfNFT(NFT_ADDRESS, tokenId));
        } catch (err) { }
    }, [])

    // nft.loading is true during load.
    if (loading) return <>Loading…</>
    // nft.error is an Error instance in case of error.
    if (error || !nft) return <>Error.</>

    try {
        (async ()=> {
            setBuyNowPrice( ethers.utils.formatEther(await NFTcontractRead.price(tokenId)) );
        })()

        axios.get(`${process.env.REACT_APP_BACKEND_API}/api/profile/${ethers.utils.getAddress(nft.owner)}`)
        .then( (res) => {
            setNftAvatar(res.data[0]?.profileImg)
            setOwnerName(res.data[0]?.name)
        })
    } catch (err){}

    if (nft?.owner === AUCTION_ADDRESS) {
        nft.owner = owner;
    }

    let flag = false;
    if(String(nft?.name).toLowerCase().includes(searchText) || String(ownername).toLowerCase().includes(searchText) || searchText === tokenId || searchText === "") {
        flag = true;
    } 

    if(flag) {
        if(category === "All" || nft?.rawData?.type === category) {
            return (
                <Link to={{pathname:'/details', state:{profileImg:nftavatar, ownername:ownername, tid:tokenId, buyprice: buynowprice, nft}}}><ExploreImage profileImg={nftavatar} ownername={ownername} nft={nft} buyprice={buynowprice}/></Link>
            )
        }
    } 

    return <></>
}

export default Nft