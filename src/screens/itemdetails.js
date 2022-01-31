import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux"
import Modal from 'react-modal'
import axios from 'axios'
import Countdown from 'react-countdown'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'

import MainImage from '../components/mainimage/MainImage'
import ArtistAvatar from '../components/artistavatar/ArtistAvatar'
import Bidder from '../components/bidder/Bidder'
import Owner from '../components/owner/Owner'
import History from '../components/history/History'
import BidInfo from '../components/bidinfo/BidInfo'
import CreateAuction from "../components/createauction/CreateAuction"
import UpdatePrice from "../components/updateprice/UpdatePrice"
import Transfer from "../components/transfer/Transfer"
import { Common } from "../redux/common";
import { ethers } from "ethers";
import { AUCTIONcontractRead, NFTcontractRead } from "../config/contractConnect"
import {
  NFT_ADDRESS,
  FT_ADDRESS,
  AUCTION_ADDRESS
} from "../config/contract";
import { updateAuction, makeBid, bidFindAll, historyFindAll, bidFindOne, settleAuction } from "../redux/actions"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#000',
      border: 'gray'
    },
  };

Modal.setAppElement("#root")

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { account, bids, historys, bidstatus, FTcontract, NFTcontract, AUCTIONcontract } = Common();
    const [minthash, setMintHash] = useState();
    const [auctionCreate, setAcutionCreate] = useState(false);
    const [nftHighestBid, setNftHighestBid] = useState();
    const [nftHighestBider, setNftHighestBider] = useState();
    const [auctionFinish, setAuctionFinish] = useState(false);
    const [regetflag, setRegetFlag] = useState(false);

    const [auctionModalIsOpen, setAuctionCreateSetIsOpen] = useState(false);
    const [bidModalIsOpen, setBidModalIsOpen] = useState(false);
    const [updatePriceIsOpen, setUpdatePriceIsOpen] = useState(false);
    const [transferIsOpen, setTransferIsOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [bidprice, setBidPrice] = useState(0);
    const [buynowprice, setBuyNowPrice] = useState(0);
    const [owner, setOwner] = useState(false);
    const [bidMinPrice, setBidMinPrice] = useState(0);
    const [nftOwner, setNftOwner] = useState("0x0000000000000000000000000000000000000000");
    const [auctionEnd, setAuctionEnd] = useState(0);

    const [nftavatar, setNftAvatar] = useState();
    const [ownername, setOwnerName] = useState();
    const [ownerAddr, setOwnerAddr] = useState("");
        
    const buy_it = async ()=> {
        try {
            if(account) {
                let buynowPay = await FTcontract.approve(NFT_ADDRESS, buynowprice);
                await buynowPay.wait();
                let buynow = await NFTcontract.buynow(state?.tid, FT_ADDRESS );
                await buynow.wait();
            } else {
                alert("Please connect MataMask!")
            }
        } catch (err) {console.log(err)}

        let addr = await NFTcontractRead.ownerOf(state?.tid);

        try {
            setOwnerAddr(await AUCTIONcontractRead.ownerOfNFT(NFT_ADDRESS, state?.tid));
        } catch (err) {}

        try {
            axios.get(`${process.env.REACT_APP_BACKEND_API}/api/profile/${addr}`)
            .then( (res) => {
                setNftAvatar(res.data[0]?.profileImg)
                setOwnerName(res.data[0]?.name)
            })
        } catch (err){}

        if( addr === AUCTION_ADDRESS) {
            addr = ownerAddr;
        }
        state.nft.owner = addr;
        state.profileImg = nftavatar;
        state.ownername = ownername;
        setRegetFlag(!regetflag);
    }

    const make_bid = async ()=> {
        try {
            if (account) {
                let price = ethers.utils.parseEther(bidprice.toString());

                let cost_pay = await FTcontract.approve(AUCTION_ADDRESS, price);
                setPending(true);
                await cost_pay.wait();
                const make_bid = await AUCTIONcontract.makeBid(NFT_ADDRESS, state?.tid, FT_ADDRESS, price);
                await make_bid.wait();
                setPending(false);
                BidCloseModal();
                dispatch( makeBid(state?.tid, nftOwner, account, bidprice) );
            } else {
                alert("Please connect MetaMask!")
            }
        } catch (err) {
            setPending(false);
        }
    }

    const cancelAuction = async ()=> {
        try {
            await AUCTIONcontract.withdrawAuction(NFT_ADDRESS, state?.tid);
            setAcutionCreate(false);
            dispatch( updateAuction(account, state?.tid, "cancel") );
        } catch (error) {
            console.log(error)
        }
    }

    const settle_auction = async ()=> {
        try {
            let settle = await AUCTIONcontract.settleAuction(NFT_ADDRESS, state?.tid);
            await settle.wait();
            dispatch( settleAuction(state?.tid, account, state?.nft?.owner, account) );
        } catch (error) {
            console.log("Settle Auction ", error)
        }
    }

    const burn = async ()=> {
        try {
            let burn = await NFTcontract.burn(state?.tid);
            await burn.wait();
            alert("Burn Success!");
        } catch(error){ }
    }

    function AuctionCreateOpenModal() {
        setAuctionCreateSetIsOpen(true);
    }

    function BidOpenModal() {
        setBidModalIsOpen(true);
    }
    function BidCloseModal() {
        setBidModalIsOpen(false);
    }

    function UpdatePriceOpenModal() {
        setUpdatePriceIsOpen(true);
    }

    function TransferOpenModal() {
        setTransferIsOpen(true)
    }

    useEffect ( async ()=> {
        try {
            axios.get(`https://deep-index.moralis.io/api/v2/nft/${NFT_ADDRESS}/${state?.tid}/transfers?chain=bsc%20testnet&format=decimal&offset=0&limit=1`, {headers:{'accept':'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_KEY }})
            .then( res => {
                if(res.status != 200 ) return
                setMintHash(res.data.result[0].transaction_hash)
            })
        } catch (err) {}

        try {
            let auction_info = await AUCTIONcontractRead.nftContractAuctions(NFT_ADDRESS, state?.tid);
            
            if(auction_info?.nftSeller !== '0x0000000000000000000000000000000000000000') {
                setNftOwner(auction_info?.nftSeller);
                setAcutionCreate(true);
                setNftHighestBid( ethers.utils.formatEther(auction_info?.nftHighestBid) );
                setNftHighestBider( auction_info?.nftHighestBidder);
                setBidMinPrice( ethers.utils.formatEther(auction_info?.minPrice) )
                setAuctionEnd(Number(ethers.utils.formatUnits(auction_info?.auctionEnd, 0)));
                dispatch( bidFindAll(state?.id, auction_info?.nftSeller) );
            } 

            let buyNowPrice = await NFTcontractRead.price(state?.tid);
            setBuyNowPrice( buyNowPrice );
        } catch(err) {}

        try {
            let nft_owner = await NFTcontractRead.ownerOf(state.tid);
            if(nft_owner === AUCTION_ADDRESS) {
                nft_owner = await AUCTIONcontractRead.nftContractAuctions(NFT_ADDRESS, state.tid);
                nft_owner = nft_owner.nftSeller;
            }
            state.nft.owner = nft_owner;
            await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/profile/${ethers.utils.getAddress(nft_owner)}`)
            .then( (res) => {
                state.profileImg = res.data[0]?.profileImg;
                state.ownername = res.data[0]?.name;
            })
        } catch(err){}

        if( state?.nft?.owner === account ) {
            setOwner(true);
        } else {
            setOwner(false);
        }
        dispatch( historyFindAll(state?.tid) )
        dispatch( bidFindOne(state?.tid, state?.nft?.owner, account))
    }, [account, regetflag])

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setAuctionFinish(completed)
            return (
               nftHighestBider == account ?
                    <button className='buy-it-button' onClick={ settle_auction }>Settle Auction</button> : ""
                    /*bidstatus?.length && nftHighestBider != account ? <button className='buy-it-button' onClick={ settle_auction }>Withdraw Bid</button> : "" */
            );
        } else {
            return <>
                <span style={{color:'yellow'}}>{days} Days, {hours} Hours, {minutes} Minutes, {seconds}s</span>
            </>
        }
    };
    
    return (
        <>
            <Breadcrumb name="Item Details" />
            <div className="starparalax create">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="title">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="items-main-cont">
                                    <h2>{state?.nft?.name}</h2> 
                                    {
                                        auctionCreate ?
                                        <h3>Highest Bid: <span>{ nftHighestBid }  $PIZZA</span></h3> :
                                        <h3>Buy Now Price: <span>{ ethers.utils.formatEther(buynowprice) }  $PIZZA</span></h3>
                                    }

                                    <div className="item-description">
                                        <p>
                                            {state?.nft?.description}
                                        </p>
                                        {
                                            auctionEnd ? <Countdown  date={ new Date(Number(auctionEnd) * 1000) }  renderer={renderer}/> : ""
                                        }
                                    </div>
                                    <div className="bidbutton">
                                        {
                                            !owner && !auctionCreate ?
                                            <button className='buy-it-button' onClick={ buy_it }>Buy It</button> :
                                            ""
                                        }
                                        {
                                            <> {
                                                auctionCreate && !owner && !bidstatus?.length && !auctionFinish ?
                                                    <button className='place-a-bid-button' onClick={ BidOpenModal }  >Place a Bid</button> :
                                                    ""
                                                }
                                                <Modal
                                                    isOpen={bidModalIsOpen}
                                                    style={customStyles}
                                                    contentLabel="Place a Bid"
                                                >
                                                     <>
                                                        <div className="row" style={{'width':'350px'}}>
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label>Bid Price</label>
                                                                    <input className="form-control" type="number" id='itemprice' onChange={ (e) => setBidPrice(e.target.value)} value={ bidprice } placeholder=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                            {   
                                                                pending ? <button className="btn btn-default" disabled >Waiting</button> :
                                                                <button className="btn btn-default" onClick={ make_bid }>Make Bid</button>
                                                            }
                                                            </div>
                                                            <div className="col-md-6">
                                                                <button className="btn btn-default" onClick={BidCloseModal} style={{'float': 'right'}} >Close</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                </Modal>
                                            </>
                                        }
                                        {
                                            owner && !auctionCreate ?
                                            <>
                                                <button className='buy-it-button' onClick={TransferOpenModal}>Transfer</button>
                                                <Modal
                                                    isOpen={transferIsOpen}
                                                    style={customStyles}
                                                    contentLabel="Create Auction"
                                                >
                                                    <Transfer setIsOpen={setTransferIsOpen} state={state} regetflag={regetflag} setRegetFlag={setRegetFlag}/>
                                                </Modal>

                                                <button className='place-a-bid-button' onClick={ UpdatePriceOpenModal }  >Update Price</button>
                                                <Modal
                                                    isOpen={updatePriceIsOpen}
                                                    style={customStyles}
                                                    contentLabel="Update Price"
                                                >
                                                    <UpdatePrice setIsOpen={setUpdatePriceIsOpen} state={state} AUCTIONcontract={AUCTIONcontract} setAcutionCreate={setAcutionCreate} setBuyNowPrice={setBuyNowPrice} buynowprice={buynowprice}/>
                                                </Modal>

                                                <button className='create-auction-button' onClick={ AuctionCreateOpenModal }  >Create Auction</button>
                                                <Modal
                                                    isOpen={auctionModalIsOpen}
                                                    style={customStyles}
                                                    contentLabel="Create Auction"
                                                >
                                                    <CreateAuction setIsOpen={setAuctionCreateSetIsOpen} state={state} AUCTIONcontract={AUCTIONcontract} setAcutionCreate={setAcutionCreate}/>
                                                </Modal>
                                                <button className='burn-it-button' onClick={ burn }>Burn</button>
                                            </> :
                                            ""
                                        }
                                        {
                                            owner && auctionCreate && !auctionEnd ?
                                            <>
                                                <button className='create-auction-button' onClick={ cancelAuction }  >Cancel Auction</button>
                                            </> :
                                            ""
                                        }
                                    </div>
                                    <div className="item-sub-description">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a data-toggle="tab" href="#home">BID</a></li>
                                            <li><a data-toggle="tab" href="#menu1">OWNER</a></li>
                                            <li><a data-toggle="tab" href="#menu2">HISTORY</a></li>
                                            <li><a data-toggle="tab" href="#menu3">INFO</a></li>
                                        </ul>

                                        <div className="tab-content">
                                            <div id="home" className="tab-pane fade in active">
                                                <div className="bidders-div">
                                                    {
                                                        auctionCreate ? bids?.map( (item, index) => 
                                                            <Bidder key={index} item={item}/>
                                                        ) :
                                                        ""
                                                    }
                                                </div>
                                            </div>
                                            <div id="menu1" className="tab-pane fade">
                                                <div className="bidders-div">
                                                    <Owner state={state} />
                                                </div>
                                            </div>
                                            <div id="menu2" className="tab-pane fade">
                                                <div className="bidders-div">
                                                    {
                                                        historys?.map( (item, index) => 
                                                            <History key={index} item={item}/>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div id="menu3" className="tab-pane fade">
                                                <div className="bidders-div">
                                                    <BidInfo id="NFT ID" name={state?.tid} />
                                                    <BidInfo id="MINT TRANSACTION" name={minthash} />
                                                    <BidInfo id="CONTRACT ADDRESS" name={process.env.REACT_APP_NFT_ADDRESS} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="main-item-right-container">
                                    <MainImage nftImg={state?.nft?.image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetails
