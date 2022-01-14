import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AUCTIONcontract, NFTcontract } from '../../config/contractConnect'
import { NFT_ADDRESS, FT_ADDRESS, AUCTION_ADDRESS } from '../../config/contract'
const CreateAuction = ({setIsOpen, state, setAcutionCreate}) => {

    const [minprice, setMinPrice] = useState(0);
    const [buyprice, setBuyPrice] = useState(0);
    const [walletconnect, setWalletConnect] = useState(localStorage.getItem('connectStatus'));
    const [pending, setPending] = useState(false);

    const create_auction = async ()=> {
        if (walletconnect === 'connected') {
           const nft_send = await NFTcontract.approve(AUCTION_ADDRESS, state?.tid);
           setPending(true);
           await nft_send.wait();
           const creat_auction =  await AUCTIONcontract.createDefaultNftAuction( NFT_ADDRESS, state?.tid, FT_ADDRESS , ethers.utils.parseEther(minprice.toString()), ethers.utils.parseEther(buyprice.toString()),["0xB63D493d2F28a76296C63Bb4F10F1E818F97f9A6"], [250])
           await creat_auction.wait();
           setPending(false);
           setAcutionCreate(true);
        } else {
            alert("Please connect MetaMask!")
        }
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <div className="row" style={{'width':'350px'}}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Min Price</label>
                        <input className="form-control" type="number" id='itemname'  onChange={ (e) => setMinPrice(e.target.value)} value={minprice}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Buy Now Price</label>
                        <input className="form-control" type="number" id='itemprice' onChange={ (e) => setBuyPrice(e.target.value)} value={buyprice}/>
                    </div>
                </div>
                <div className="col-md-6">
                {   
                    pending ? <button className="btn btn-default" disabled >Creating</button> :
                    <button className="btn btn-default" onClick={ create_auction} >Create</button>
                }
                </div>
                <div className="col-md-6">
                    <button className="btn btn-default" onClick={closeModal} style={{'float': 'right'}} >Close</button>
                </div>
            </div>
        </>
    )
}

export default CreateAuction
