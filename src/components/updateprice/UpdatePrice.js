import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { NFTcontract } from '../../config/contractConnect'

const UpdatePrice = ({setIsOpen, state, setBuyNowPrice, buynowprice }) => {
    const [pending, setPending] = useState(false);
    const [updatePrice, setUpdatePrice] = useState(ethers.utils.formatEther(buynowprice));

    function closeModal() {
        setIsOpen(false);
    }

    const update = async ()=> {
        try {
            let update = await NFTcontract.updatePrice(state?.tid, ethers.utils.parseEther(updatePrice.toString()));
            setPending(true);
            await update.wait();
            setBuyNowPrice( ethers.utils.parseEther(updatePrice) );
            setPending(false);
            closeModal();
        } catch (err) {
            setPending(false)
        }
    }

    return (
        <>
            <div className="row" style={{'width':'350px'}}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Update Price ($PIZZA)</label>
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