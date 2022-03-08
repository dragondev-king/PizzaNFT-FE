import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch } from "react-redux"
import { NFT_ADDRESS, AUCTION_ADDRESS } from '../../config/contract'
import { Common } from '../../redux/common'
import { createAuction } from '../../redux/actions'

const CreateAuction = ({setIsOpen, state, setAcutionCreate}) => {
    const dispatch = useDispatch();
    const { account, AUCTIONcontract, NFTcontract } = Common();
    const [startPrice, setStartPrice] = useState(0.1);
    const [pending, setPending] = useState(false);

    const create_auction = async ()=> {
        try {
            if (account) {
               const nft_send = await NFTcontract.approve(AUCTION_ADDRESS, state?.tid);
               setPending(true);
               await nft_send.wait();
               const creat_auction =  await AUCTIONcontract.createDefaultNftAuction( NFT_ADDRESS, state?.tid, startPrice, startPrice * 3)
               await creat_auction.wait();
               setPending(false);
               setAcutionCreate(true);
               dispatch(createAuction(account, state?.tid))
            } else {
                alert("Please connect MetaMask!")
            }
        } catch (err) {setPending(false);}
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <div className="row" style={{'width':'350px'}}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Bid Start Price (BNB)</label>
                        <input className="form-control" type="number" id='itemname'  onChange={ (e) => setStartPrice(e.target.value)} value={startPrice}/>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                {   
                    pending ? <button className="btn btn-default" disabled >Creating</button> :
                    <button className="btn btn-default" onClick={ create_auction} >Create</button>
                }
                </div>
                <div className="col-md-6 col-sm-6">
                    <button className="btn btn-default" onClick={closeModal} style={{'float': 'right'}} >Close</button>
                </div>
            </div>
        </>
    )
}

export default CreateAuction
