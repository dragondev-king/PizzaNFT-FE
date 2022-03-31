import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useDispatch } from "react-redux"
import { nftUpdatePrice } from '../../redux/actions'
import { Common } from '../../redux/common'


const UpdatePrice = ({setIsOpen, state, setBuyNowPrice, buynowprice }) => {
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);
    const [updatePrice, setUpdatePrice] = useState(ethers.utils.formatEther(buynowprice));

    const { NFTcontract }  = Common();

    function closeModal() {
        setIsOpen(false);
    }

    const update = async ()=> {
        try {
            let update = await NFTcontract.updatePrice(state?.tid, ethers.utils.parseEther(updatePrice.toString()));
            setPending(true);
            await update.wait();
            dispatch( nftUpdatePrice(state?.tid, state?.nft?.owner, ethers.utils.formatEther(buynowprice), updatePrice ) );
            setBuyNowPrice( ethers.utils.parseEther(updatePrice) );
            setPending(false);
            closeModal();
            window.location.reload(false);
        } catch (err) {
            setPending(false)
        }
    }

    return (
        <>
            <div className="row" style={{'width':'350px'}}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Update Price (BNB)</label>
                        <input className="form-control" type="number" id='itemprice' onChange={ (e) => setUpdatePrice(e.target.value)} value={updatePrice} />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                {   
                    pending ? <button className="btn btn-default" disabled >Waiting</button> :
                    <button className="btn btn-default" onClick={update} >Update</button>
                }
                </div>
                <div className="col-md-6 col-sm-6">
                    <button className="btn btn-default" onClick={closeModal} style={{'float': 'right'}} >Close</button>
                </div>
            </div>
        </>
    )
}

export default UpdatePrice
