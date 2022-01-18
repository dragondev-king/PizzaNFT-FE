import React, { useState } from 'react'
import { NFTcontract } from '../../config/contractConnect'

const UpdatePrice = ({setIsOpen, state}) => {
    const [pending, setPending] = useState(false);
    const [toAddress, setToAddress] = useState("");
    function closeModal() {
        setIsOpen(false);
    }

    const transfer = async () => {
        try {
            const send = await NFTcontract.safeTransferFrom(state?.nft?.owner, toAddress, state?.tid);
            setPending(true);
            await send.wait();
            setPending(false);
            closeModal();
        } catch (err) {console.log(err)}
    }
    return (
        <>
            <div className="row" style={{'width':'350px'}}>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Address</label>
                        <input className="form-control" type="text" id='toaddress' onChange={(e) => setToAddress(e.target.value)} value={toAddress} placeholder="Please enter the recipient's address"/>
                    </div>
                </div>
              
                <div className="col-md-6 col-sm-6">
                {   
                    pending ? <button className="btn btn-default" disabled >Sending</button> :
                    <button className="btn btn-default" onClick={ transfer } >Send</button>
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
