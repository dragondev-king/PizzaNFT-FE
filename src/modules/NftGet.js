import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {ethers} from 'ethers'
import {
    NFT_ADDRESS,
    AUCTION_ADDRESS,
  } from "../config/contract"
import { AUCTIONcontract, NFTcontract } from "../config/contractConnect"
import { useNft } from "use-nft"
import ExploreImage from '../components/exploreimage/ExploreImage'

function Nft({tokenId}) {
    const [nftavatar, setNftAvatar] = useState();
    const [ownername, setOwnerName] = useState();
    const [owner, setOwner] = useState("");
    const [buynowprice, setBuyNowPrice] = useState(0);

    const {loading, error, nft} = useNft(
      NFT_ADDRESS,
      tokenId
    )

    useEffect( async()=> {
        try {
            setOwner(await AUCTIONcontract.ownerOfNFT(NFT_ADDRESS, tokenId));
        } catch (err) {}
    }, [])

    // nft.loading is true during load.
    if (loading) return <>Loading…</>
    // nft.error is an Error instance in case of error.
    if (error || !nft) return <>Error.</>


    try {
        (async ()=> {
            setBuyNowPrice( ethers.utils.formatEther(await NFTcontract.price(tokenId), {from: nft.owner}) );
        })()

        axios.get(`http://localhost:8080/api/profile/${ethers.utils.getAddress(nft.owner)}`)
        .then( (res) => {
            setNftAvatar(res.data[0]?.profileImg)
            setOwnerName(res.data[0]?.name)
        })
    } catch (err){}

    if( nft?.owner === AUCTION_ADDRESS) {
        nft.owner = owner;
    }

    // You can now display the NFT metadata.
    return (
        <Link to={{pathname:'/details', state:{profileImg:nftavatar, ownername:ownername, tid:tokenId, buyprice: buynowprice, nft}}}><ExploreImage profileImg={nftavatar} ownername={ownername} nft={nft} buyprice={buynowprice}/></Link>
    )
}

export default Nft