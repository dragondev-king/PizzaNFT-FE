import React, { useState, useRef } from 'react'
import { create } from 'ipfs-http-client';
import { ethers } from "ethers";
import Size from '../size/Size';
import VerifiedArtist from '../verifiedArtist/VerifiedArtist';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Common } from '../../redux/common';
import {
    NFT_ADDRESS,
    FT_ADDRESS,
  } from "../../config/contract";
const client = create('https://ipfs.infura.io:5001/api/v0');
const options = [
    'art', 'photography', 'sports', 'athletes', 'celebrities', 'music', 'gif and videos', 'collectibles', 'trading cards', 'utilities', 'virtual worlds',
];

const CreateForm = () => {
    const { account, NFTcontract, mintPrice, FTcontract } = Common();
    const [itemfile, setItemFile] = useState("");
    const [itemname, setItemName] = useState("");
    const [itemdesc, setItemDesc] = useState("");
    const [itemprice, setItemPrice] = useState(0);
    const [royaltyFee, setRoyaltyFee] = useState(0);
    const [itempending, setItemPending] = useState(false);
    const [putOnSale, setPutOnSale] = useState(false);
    const [buynowState, setBuynowState] = useState(false);
    const [viewState, setViewState] = useState(false);
    const [defaultOption, setDefaultOption] = useState(options[0]);
    const [socialLink, setsocialLink] = useState("");
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [verified, setVerified] = useState(false);

    const handleChange = (e) => {
        const [file] = e.target.files;
        setItemFile(file);
    };

    const onSelect = (e) => {
        setDefaultOption(e.value);
    }
            
    const createItem = async ()=> {
        if (account) {
            setItemPending(true);
            const item = await client.add(itemfile);
            const url = `https://ipfs.infura.io/ipfs/${item.path}`;

            const metadata = {
                name: itemname,
                description: itemdesc,
                image: url,
                social: socialLink,
                width: width,
                height: height,
                capacity: capacity,
                verified: verified,
                type: defaultOption
            }
            
            const metadataJson = JSON.stringify(metadata);
            const blob = new Blob([metadataJson], {type: "application/json"});
            const metadataAdd = await client.add(blob);
            const ipfsMeta = `https://ipfs.infura.io/ipfs/${metadataAdd.path}`;
            try {
                let cost_pay = await FTcontract.approve(NFT_ADDRESS, mintPrice);
                await cost_pay.wait();
                let pizzaNFT = await NFTcontract.mint(ipfsMeta, itemprice, FT_ADDRESS, mintPrice, royaltyFee, putOnSale, buynowState, viewState);
                await pizzaNFT.wait();
                setItemPending(false);
            } catch (err) {setItemPending(false); console.log(err);}
        } else {
            alert("please connect MetaMask!");
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="fileupload">Category</label>
                        <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option" />
                    </div>
                </div>
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
                        <label htmlFor="itemprice">Item Price ( BNB )</label>
                        <input className="form-control" type="number" id='itemprice' onChange={ (e) => { try {setItemPrice( ethers.utils.parseEther((e.target.value).toString()))} catch(err){} }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="royality">Royality ( max 20% )</label>
                        <input className="form-control" type="number" id='royality' onChange={ (e) => { try {setRoyaltyFee(e.target.value)} catch(err){} }} placeholder="100 is 1%"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <Size setWidth={setWidth} width={width} setHeight={setHeight} height={height} setCapacity={setCapacity} capacity={capacity} />
                        {/* <label htmlFor="itemsize">Size</label>
                        <input className="form-control" type="text" id='itemsize' /> */}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="artist_social_link">Artist Social Media Link</label>
                        <input className="form-control" type="text" id='artist_social_link' value={socialLink} onChange={ (e) => { try {setsocialLink(e.target.value)} catch(err) {}}}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <VerifiedArtist setVerified={setVerified} verified={verified}  />
                        {/* <label htmlFor="itemsize">Size</label>
                        <input className="form-control" type="text" id='itemsize' /> */}
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="noofcopies">No of Copies</label>
                        <input className="form-control" type="text" id='noofcopies' />
                    </div>
                </div> */}
                <div className="col-md-12 create-radio-buttons">
                    <div className="standards-container ">
                        <label className="checkbox-button">
                            <input type="radio" name="saletype" value={putOnSale} onChange={ () => { setPutOnSale(true); setBuynowState(false); setViewState(false); } } />
                            <span>Bid Price</span>
                        </label>

                        <label className="checkbox-button">
                            <input type="radio" name="saletype" value={buynowState} onChange={ () => {setPutOnSale(false); setBuynowState(true); setViewState(false);} } />
                            <span>Buy Now</span>
                        </label>
                        <label className="checkbox-button">
                            <input type="radio" name="saletype" value={viewState} onChange={ () => {setPutOnSale(false); setBuynowState(false); setViewState(true);} } />
                            <span>Mint Only</span>
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
