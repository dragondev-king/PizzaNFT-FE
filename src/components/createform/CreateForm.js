import React, { useState, useRef} from 'react'
import { create } from 'ipfs-http-client';
import { ethers } from "ethers";
import {
  NFT_ADDRESS,
  USDT_ADDRESS,
  MINT_PRICE
} from "../../config/contract";
import { Common } from '../../redux/common';

const client = create('https://ipfs.infura.io:5001/api/v0');

const CreateForm = () => {
    const { account, NFTcontract, USDTcontract } = Common();
    const [itemfile, setItemFile] = useState("");
    const [itemname, setItemName] = useState("");
    const [itemdesc, setItemDesc] = useState("");
    const [itemprice, setItemPrice] = useState(0);
    const [itempending, setItemPending] = useState(false);

    const handleChange = (e) => {
        const [file] = e.target.files;
        setItemFile(file);
    };

    const createItem = async ()=> {
        if (account) {
            setItemPending(true);
            const item = await client.add(itemfile);
            const url = `https://ipfs.infura.io/ipfs/${item.path}`;

            const metadata = {
                name: itemname,
                description: itemdesc,
                image: url
            }
            
            const metadataJson = JSON.stringify(metadata);
            const blob = new Blob([metadataJson], {type: "application/json"});
            const metadataAdd = await client.add(blob);
            const ipfsMeta = `https://ipfs.infura.io/ipfs/${metadataAdd.path}`;
            try {
                let cost_pay = await USDTcontract.approve(NFT_ADDRESS, ethers.utils.parseEther(MINT_PRICE.toString()));
                await cost_pay.wait();
                let pizzaNFT = await NFTcontract.mint(ipfsMeta, USDT_ADDRESS, itemprice, ethers.utils.parseEther(MINT_PRICE.toString()));
                await pizzaNFT.wait();
                setItemPending(false);
            } catch (err) {setItemPending(false)}
        } else {
            alert("please connect MetaMask!");
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="fileupload">Upload File</label>
                        <input type="file" className="form-control-file" id="fileupload" onChange={ handleChange }/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="itemname">Item Name</label>
                        <input className="form-control" type="text" id='itemname' onChange={ (e) => setItemName(e.target.value) } />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" rows="3" onChange={ (e) => setItemDesc(e.target.value) }></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="itemprice">Item Price</label>
                        <input className="form-control" type="number" id='itemprice' onChange={ (e) => { try {setItemPrice( ethers.utils.parseEther((e.target.value).toString()))} catch(err){} }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="royality">Royality</label>
                        <input className="form-control" type="text" id='royality' />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="itemsize">Size</label>
                        <input className="form-control" type="text" id='itemsize' />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="noofcopies">No of Copies</label>
                        <input className="form-control" type="text" id='noofcopies' />
                    </div>
                </div>
                <div className="col-md-12 create-radio-buttons">
                    <div className="standards-container ">
                        <label className="checkbox-button">
                            <input type="radio" name="saletype" />
                            <span>Put on Sale</span>
                        </label>

                        <label className="checkbox-button">
                            <input type="radio" name="saletype" />
                            <span>Instant Sale Price</span>
                        </label>
                        <label className="checkbox-button">
                            <input type="radio" name="saletype" />
                            <span>Unlock Purchased</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-12">
                {
                    !itempending ? <button className="btn btn-default" onClick={ createItem }>Create Item</button>:
                    <button className="btn btn-default" disabled >Create Item</button>
                }
                    
                </div>
            </div>
        </>
    )
}

export default CreateForm
