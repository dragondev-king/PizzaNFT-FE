import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import Countdown from "react-countdown";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";

import MainImage from "../components/mainimage/MainImage";
import ArtistAvatar from "../components/artistavatar/ArtistAvatar";
import Bidder from "../components/bidder/Bidder";
import Owner from "../components/owner/Owner";
import History from "../components/history/History";
import BidInfo from "../components/bidinfo/BidInfo";
import CreateAuction from "../components/createauction/CreateAuction";
import UpdatePrice from "../components/updateprice/UpdatePrice";
import Transfer from "../components/transfer/Transfer";
import { Common } from "../redux/common";
import { ethers } from "ethers";
import {
  AUCTIONcontractRead,
  NFTcontractRead,
} from "../config/contractConnect";
import { NFT_ADDRESS, AUCTION_ADDRESS } from "../config/contract";
import {
  updateAuction,
  makeBid,
  bidFindAll,
  historyFindAll,
  settleAuction,
} from "../redux/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#000",
    border: "gray",
  },
};

Modal.setAppElement("#root");

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { account, bids, historys, NFTcontract, AUCTIONcontract } = Common();
  const [minthash, setMintHash] = useState();
  
  const [auctionCreated, setAcutionCreated] = useState();
  const [nftHighestBid, setNftHighestBid] = useState();
  const [nftHighestBider, setNftHighestBider] = useState();
  const [auctionCreatedAt, setAuctionCreatedAt] = useState();
  const [auctionPeriod, setAuctionPeriod] = useState();
  const [startPrice, setStartPrice] = useState(0);
  
  const [regetflag, setRegetFlag] = useState();

  const [isAuction, setIsAuction] = useState();
  const [isSale, setIsSale] = useState();
  const [isMintOnly, setIsMintOnly] = useState();

  const [auctionModalIsOpen, setAuctionCreateSetIsOpen] = useState();
  const [bidModalIsOpen, setBidModalIsOpen] = useState();
  const [updatePriceIsOpen, setUpdatePriceIsOpen] = useState();
  const [transferIsOpen, setTransferIsOpen] = useState();
  const [pending, setPending] = useState();
  const [bidprice, setBidPrice] = useState(0);
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [buynowprice, setBuyNowPrice] = useState(0);
  const [owner, setOwner] = useState();
  const [nftOwner, setNftOwner] = useState(
    ethers.constants.AddressZero
  );
  const [auctionOngoing, setAuctionOngoing] = useState(0);

  const [nftavatar, setNftAvatar] = useState();
  const [ownername, setOwnerName] = useState();
  const [ownerAddr, setOwnerAddr] = useState("");

  useEffect(async () => {
    try {
      if (state?.nft?.owner === account) {
        setOwner(true);
      } else {
        setOwner(false);
      }

      let nft_owner = await NFTcontractRead.ownerOf(state.tid);
      console.log(nft_owner, 'owner')

      let is_auction = await NFTcontractRead.getPutOnSaleState(state.tid);
      let is_sale = await NFTcontractRead.getCanBuyState(state.tid);
      let is_mint_only = await NFTcontractRead.getOnlyViewState(state.tid);

      console.log(
        "flag",
        "isAuction:",
        is_auction,
        "isSale:",
        is_sale,
        "isMintOnly:",
        is_mint_only
      );
      setIsAuction(is_auction);
      setIsSale(is_sale);
      setIsMintOnly(is_mint_only);
      
      console.log(state, 'state')
      console.log(state.nft.owner, 'before')
      state.nft.owner = nft_owner;
      console.log(state.nft.owner, 'after')
      await axios
        .get(
          `${
            process.env.REACT_APP_BACKEND_API
          }/api/profile/${ethers.utils.getAddress(nft_owner)}`
        )
        .then((res) => {
          state.profileImg = res.data[0]?.profileImg;
          state.ownername = res.data[0]?.name;
        });
    } catch (err) {
      console.log(err);
    }

    try {
      axios
        .get(
          `https://deep-index.moralis.io/api/v2/nft/${NFT_ADDRESS}/${state?.tid}/transfers?chain=bsc%20testnet&format=decimal&offset=0&limit=1`,
          {
            headers: {
              accept: "application/json",
              "X-API-Key": process.env.REACT_APP_MORALIS_KEY,
            },
          }
        )
        .then((res) => {
          if (res.status != 200) return;
          setMintHash(res.data.result[0].transaction_hash);
        });
    } catch (err) {}

    try {
      let auction_info = await AUCTIONcontractRead.pizzaAuctions(
        NFT_ADDRESS,
        state?.tid
      );

      if (
        auction_info?.nftSeller !== ethers.constants.AddressZero
      ) {
        const { nftSeller, nftHighestBid, nftHighestBidder, auctionPeriod, createdAt, startPrice, reservePrice} = auction_info;
        setNftOwner(nftSeller);
        setAcutionCreated(true);
        setNftHighestBid(ethers.utils.formatEther(nftHighestBid));
        setNftHighestBider(nftHighestBidder);
        setAuctionPeriod(auctionPeriod);
        setAuctionCreatedAt(createdAt);
        setReservePrice(reservePrice);
        setStartPrice(startPrice)

        
        setAuctionOngoing(
          Boolean(Date.now() - (createdAt + auctionPeriod) > 0)
        );
        dispatch(bidFindAll(state?.id, nftSeller));
      }

      let buyNowPrice = await NFTcontractRead.prices(state?.tid);
      setBuyNowPrice(buyNowPrice);
    } catch (err) {}

    dispatch(historyFindAll(state?.tid));
    // dispatch( bidFindOne(state?.tid, state?.nft?.owner, account))
  }, [account, regetflag]);

  const buy_it = async () => {
    try {
      if (account) {
        let buynow = await NFTcontract.buynow(state?.tid, {
          value: buynowprice,
        });
        await buynow.wait();
      } else {
        alert("Please connect MetaMask or Trust Wallet!");
      }
    } catch (err) {
      console.log(err);
    }

    let addr = await NFTcontractRead.ownerOf(state?.tid);

    try {
      setOwnerAddr(
        await AUCTIONcontractRead.pizzaAuctions(NFT_ADDRESS, state?.tid)
          .nftSeller
      );
    } catch (err) {}

    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_API}/api/profile/${addr}`)
        .then((res) => {
          setNftAvatar(res.data[0]?.profileImg);
          setOwnerName(res.data[0]?.name);
        });
    } catch (err) {}

    if (addr === AUCTION_ADDRESS) {
      addr = ownerAddr;
    }
    state.nft.owner = addr;
    state.profileImg = nftavatar;
    state.ownername = ownername;
    setRegetFlag(!regetflag);
  };

  const make_bid = async () => {
    try {
      if (account) {
        let price = ethers.utils.parseEther(bidprice.toString());
        setPending(true);
        const make_bid = await AUCTIONcontract.makeBid(
          NFT_ADDRESS,
          state?.tid,
          price,
          recipient,
          { value: price }
        );
        await make_bid.wait();
        setPending(false);
        BidCloseModal();
        dispatch(makeBid(state?.tid, nftOwner, account, bidprice, recipient));
        setRegetFlag(!regetflag);
      } else {
        alert("Please connect MetaMask!");
      }
    } catch (err) {
      setPending(false);
    }
  };

  const cancelAuction = async () => {
    try {
      await AUCTIONcontract.withdrawAuction(NFT_ADDRESS, state?.tid);
      setAcutionCreated(false);
      dispatch(updateAuction(account, state?.tid, "cancel"));
      setRegetFlag(!regetflag);
    } catch (error) {
      console.log(error);
    }
  };

  const settle_auction = async () => {
    try {
      let settle = await AUCTIONcontract.settleAuction(NFT_ADDRESS, state?.tid);
      await settle.wait();
      dispatch(settleAuction(state?.tid, account, state?.nft?.owner, account));
      setRegetFlag(!regetflag);
    } catch (error) {
      console.log("Settle Auction ", error);
    }
  };

  const burn = async () => {
    try {
      let burn = await NFTcontract.burn(state?.tid);
      await burn.wait();
      alert("Burn Success!");
      setRegetFlag(!regetflag);
    } catch (error) {}
  };

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
    setTransferIsOpen(true);
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setAuctionFinish(completed);
      return nftHighestBider == account ? (
        <button className="buy-it-button" onClick={settle_auction}>
          Settle Auction
        </button>
      ) : (
        <></>
      );
    } else {
      return (
        <>
          <span style={{ color: "yellow" }}>
            {days} Days, {hours} Hours, {minutes} Minutes, {seconds}s
          </span>
        </>
      );
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
                  {auctionCreated ? (
                    <h3>
                      Highest Bid: <span>{nftHighestBid} BNB</span>
                    </h3>
                  ) : (
                    <h3>
                      Buy Now Price:{" "}
                      <span>{ethers.utils.formatEther(buynowprice)} BNB</span>
                    </h3>
                  )}

                  <div className="item-description">
                    <p>{state?.nft?.description}</p>
                    {auctionOngoing ? (
                      <Countdown
                        date={auctionCreatedAt + auctionPeriod - Date.now()}
                        renderer={renderer}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  {account ? (
                    !isMintOnly ? (
                      <div className="bidbutton">
                        {owner ? (
                          isSale ? (
                            <>
                              <button
                                className="buy-it-button"
                                onClick={TransferOpenModal}
                              >
                                Transfer
                              </button>
                              <Modal
                                isOpen={transferIsOpen}
                                style={customStyles}
                                contentLabel="Create Auction"
                              >
                                <Transfer
                                  setIsOpen={setTransferIsOpen}
                                  state={state}
                                  regetflag={regetflag}
                                  setRegetFlag={setRegetFlag}
                                />
                              </Modal>

                              <button
                                className="place-a-bid-button"
                                onClick={UpdatePriceOpenModal}
                              >
                                Update Price
                              </button>
                              <Modal
                                isOpen={updatePriceIsOpen}
                                style={customStyles}
                                contentLabel="Update Price"
                              >
                                <UpdatePrice
                                  setIsOpen={setUpdatePriceIsOpen}
                                  state={state}
                                  AUCTIONcontract={AUCTIONcontract}
                                  setAcutionCreate={setAcutionCreated}
                                  setBuyNowPrice={setBuyNowPrice}
                                  buynowprice={buynowprice}
                                />
                              </Modal>

                              <button className="burn-it-button" onClick={burn}>
                                Burn
                              </button>
                            </>
                          ) : isAuction ? (
                            <>
                              {!auctionCreated && auctionOngoing ? (
                                <>
                                  <button
                                    className="create-auction-button"
                                    onClick={AuctionCreateOpenModal}
                                  >
                                    Create Auction
                                  </button>
                                  <Modal
                                    isOpen={auctionModalIsOpen}
                                    style={customStyles}
                                    contentLabel="Create Auction"
                                  >
                                    <CreateAuction
                                      setIsOpen={setAuctionCreateSetIsOpen}
                                      state={state}
                                      AUCTIONcontract={AUCTIONcontract}
                                      setAcutionCreate={setAcutionCreated}
                                    />
                                  </Modal>
                                </>
                              ) : (
                                <></>
                              )}
                              {auctionCreated && !auctionOngoing ? (
                                <button
                                  className="create-auction-button"
                                  onClick={cancelAuction}
                                >
                                  Cancel Auction
                                </button>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )
                        ) : !isAuction ? (
                          <button className="buy-it-button" onClick={buy_it}>
                            Buy It
                          </button>
                        ) : (
                          <>
                            {nftHighestBider !== account ? (
                              <>
                                <button
                                  className="place-a-bid-button"
                                  onClick={BidOpenModal}
                                >
                                  Place a Bid
                                </button>
                                <Modal
                                  isOpen={bidModalIsOpen}
                                  style={customStyles}
                                  contentLabel="Place a Bid"
                                >
                                  <>
                                    <div
                                      className="row"
                                      style={{ width: "350px" }}
                                    >
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Bid Price</label>
                                          <input
                                            className="form-control"
                                            type="number"
                                            id="itemprice"
                                            onChange={(e) =>
                                              setBidPrice(e.target.value)
                                            }
                                            value={bidprice}
                                            placeholder=""
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Recipient</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            id="recipient"
                                            onChange={(e) =>
                                              setRecipient(e.target.value)
                                            }
                                            value={bidprice}
                                            placeholder="default recipient is you"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        {pending ? (
                                          <button
                                            className="btn btn-default"
                                            disabled
                                          >
                                            Waiting
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-default"
                                            onClick={make_bid}
                                          >
                                            Make Bid
                                          </button>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <button
                                          className="btn btn-default"
                                          onClick={BidCloseModal}
                                          style={{ float: "right" }}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                </Modal>
                              </>
                            ) : (
                              <>
                                {" "}
                                <button className="place-a-bid-button" disabled>
                                  Bided
                                </button>{" "}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                  <div className="item-sub-description">
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a data-toggle="tab" href="#home">
                          BID
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tab" href="#menu1">
                          OWNER
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tab" href="#menu2">
                          HISTORY
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tab" href="#menu3">
                          INFO
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div id="home" className="tab-pane fade in active">
                        <div className="bidders-div">
                          {auctionCreated ? (
                            bids?.map((item, index) => (
                              <Bidder key={index} item={item} />
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div id="menu1" className="tab-pane fade">
                        <div className="bidders-div">
                          <Owner state={state} />
                        </div>
                      </div>
                      <div id="menu2" className="tab-pane fade">
                        <div className="bidders-div">
                          {historys?.map((item, index) => (
                            <History key={index} item={item} />
                          ))}
                        </div>
                      </div>
                      <div id="menu3" className="tab-pane fade">
                        <div className="bidders-div">
                          <BidInfo id="NFT ID" name={state?.tid} />
                          <BidInfo id="MINT TRANSACTION" name={minthash} />
                          <BidInfo
                            id="CONTRACT ADDRESS"
                            name={process.env.REACT_APP_NFT_ADDRESS}
                          />
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
  );
};

export default ItemDetails;
