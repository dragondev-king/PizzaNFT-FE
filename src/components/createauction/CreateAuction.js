import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch } from "react-redux"
import { AUCTIONcontract, NFTcontract } from '../../config/contractConnect'
import { NFT_ADDRESS, FT_ADDRESS, AUCTION_ADDRESS, TEAMWALLET_ADDRESS, TEAM_ROYALTY } from '../../config/contract'
import { Common } from '../../redux/common'
import { createAuction } from '../../redux/actions'

const CreateAuction = ({setIsOpen, state, setAcutionCreate}) => {
    const dispatch = useDispatch();
    const { status, account } = Common();
    const [minprice, setMinPrice] = useState(10);
    const [buyprice, setBuyPrice] = useState(100000000);
    const [pending, setPending] = useState(false);


    const create_auction = async ()=> {
        if (status === 'connected') {
           const nft_send = await NFTcontract.approve(AUCTION_ADDRESS, state?.tid);
           setPending(true);
           await nft_send.wait();
           const creat_auction =  await AUCTIONcontract.createDefaultNftAuction( NFT_ADDRESS, state?.tid, FT_ADDRESS , ethers.utils.parseEther(minprice.toString()), ethers.utils.parseEther(buyprice.toString()),[TEAMWALLET_ADDRESS], [TEAM_ROYALTY])
           await creat_auction.wait();
           setPending(false);
           setAcutionCreate(true);
           dispatch(createAuction(account, state?.tid))
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
                        <label>Bid Start Price ($PIZZA)</label>
                        <input className="form-control" type="number" id='itemname'  onChange={ (e) => setMinPrice(e.target.value)} value={minprice}/>
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
