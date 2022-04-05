import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import Countdown from "react-countdown";
import ReactPlayer from "react-player";
import { useNft } from "use-nft";
import { ethers } from "ethers";

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
import { showNotification, getUTCTime } from "../utils/helpers";

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
  const params = useParams()
  const history = useHistory()
  const { account, bids, historys, NFTcontract, AUCTIONcontract } = Common();
  const [minthash, setMintHash] = useState();

  const [auctionCreated, setAuctionCreated] = useState(false);
  const [highestBid, setNftHighestBid] = useState();
  const [highestBider, setNftHighestBider] = useState();
  const [auctionCreatedAt, setAuctionCreatedAt] = useState();
  const [auctionDuration, setAuctionDuration] = useState();

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
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero);
  const [buynowprice, setBuyNowPrice] = useState(0);
  const [owner, setOwner] = useState();
  const [nftOwner, setNftOwner] = useState(ethers.constants.AddressZero);
  const [auctionOngoing, setAuctionOngoing] = useState(false);
  const [tradeFee, setTradeFee] = useState();
  const [royaltyFee, setRoyaltyFee] = useState();
  const [contentType, setContentType] = useState()
  const [coverImage, setCoverImage] = useState()

  const { loading, error, nft } = useNft(NFT_ADDRESS, params?.tid);
  const [ nftItem, setNftItem ] = useState({})
  const [profileImg, setProfileImg] = useState("")
  const [ownerName, setOwnerName] = useState("")

  useEffect(() => {
    if(nftOwner === account) {
      setOwner(true)
    } else {
      setOwner(false)
    }
  }, [setOwner, nftOwner, account])

  useEffect(async () => {
    if(nft?.image) {
      try {
        const result = await axios.get(nft?.image)
        setContentType(result.headers['content-type'])
      } catch(err) {
        console.log(err)
      }
    }
  }, [nft?.image])


  // if (nft) setState({...state, nft})
  useEffect(() => {
    if(nft) {
      setNftItem(nft)
    }
  }, [nft, setNftItem])
  // nft.error is an Error instance in case of error.
  if (error) history.push('/')

  useEffect( async () => {
    if(nft?.owner) {
      let accountAddress = nft?.owner
      if(nft.owner === AUCTION_ADDRESS) accountAddress = nftOwner
      setNftOwner(accountAddress)
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/profile/${ethers.utils.getAddress(accountAddress)}`
        )
        .then((res) => {
          setProfileImg(res.data[0]?.profileImg)
          setOwnerName(res.data[0]?.name)
          setCoverImage(res.data[0]?.coverImg)
        });
      } catch (err) {}
    }
  }, [setProfileImg, setOwnerName, setCoverImage, nft?.owner, nftOwner])
  
  useEffect( async() => {
    if(nftItem) {
      try {
        const ownerAddress = await NFTcontractRead.ownerOf(params?.tid)
        const auction = await AUCTIONcontractRead.pizzaAuctions(NFT_ADDRESS, params?.tid);
        if(ownerAddress === AUCTION_ADDRESS) {
          // state.nft.owner = auction.nftSeller;
          setNftItem({...nftItem, owner: auction.nftSeller})
          
        } else {
          // state.nft.owner = ownerAddress
          setNftItem({...nftItem, owner: ownerAddress})
        }

        if (auction?.nftSeller !== ethers.constants.AddressZero) {
          const {
            nftSeller,
            nftHighestBid,
            nftHighestBidder,
            auctionPeriod,
            createdAt,
          } = auction;

          setNftOwner(nftSeller);
          setAuctionCreated(true);
          setNftHighestBid(nftHighestBid);
          setNftHighestBider(nftHighestBidder);
          setAuctionDuration(parseInt(auctionPeriod, 10));
          setAuctionCreatedAt(parseInt(createdAt, 10));
          setAuctionOngoing(
            Boolean((parseInt(auctionPeriod, 10) * 1000   + getUTCTime(parseInt(createdAt, 10) * 1000).getTime() - getUTCTime().getTime()) > 0)
          );
          dispatch(bidFindAll(params?.tid));
        }
      } catch(err) {
        console.log(err)
      }
    }
  }, [params.tid,nft?.owner, setNftItem, bidFindAll, setNftOwner, setAuctionCreated, setNftHighestBid, setNftHighestBider, setAuctionDuration, setAuctionCreatedAt, setAuctionOngoing])

  useEffect( async() => {
    try {
      const putOnSale = await NFTcontractRead.getPutOnSaleState(params.tid)
      const canBy = await NFTcontractRead.getCanBuyState(params.tid)
      const onlyView = await NFTcontractRead.getOnlyViewState(params.tid)

      setIsAuction(putOnSale)
      setIsSale(canBy)
      setIsMintOnly(onlyView)
    } catch(err) {
      console.log(err)
    }
  }, [setIsAuction, setIsSale, setIsMintOnly, params.tid])

  useEffect( async() => {
    try{
      await axios.get(
          `https://deep-index.moralis.io/api/v2/nft/${NFT_ADDRESS}/${params?.tid}/transfers?chain=bsc&format=decimal&offset=0&limit=1`,
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
    } catch(err) {
      console.log(err)
    }
  }, [NFT_ADDRESS, params?.tid, setMintHash])

  useEffect(async () => {
    try {
      const buyNowPrice = await NFTcontractRead.prices(params?.tid);
      const trFee = await NFTcontractRead.getFee(buyNowPrice)
      const rlFee = await NFTcontractRead.getRoyaltyFee(params?.tid)
      
      setBuyNowPrice(buyNowPrice);
      setTradeFee(parseInt(trFee, 10))
      setRoyaltyFee(parseInt(rlFee, 10))
    } catch (err) {
      console.log(err)
    }
    dispatch(historyFindAll(params?.tid));
  }, [params?.tid, setBuyNowPrice, setTradeFee, setRoyaltyFee, historyFindAll]);

  const buy_it = async () => {
    try {
      if (account) {
        const requiredPrice = buynowprice * (10000 + royaltyFee + tradeFee ) / 10000
        let buynow = await NFTcontract.buynow(params?.tid, {
          value: requiredPrice
        });
        await buynow.wait();
      } else {
        showNotification({
          title: 'Warning',
          message: 'Please connect MetaMask',
          type: 'warning',
          insert: 'top',
          container: 'top-right'
        })
      }
    } catch (err) {
      console.log(err);
    }

    let addr = await NFTcontractRead.ownerOf(params?.tid);

    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_API}/api/profile/${addr}`)
        .then((res) => {
          setProfileImg(res.data[0]?.profileImg)
          setOwnerName(res.data[0]?.name)
        });
    } catch (err) {}

    // if (addr === AUCTION_ADDRESS) {
    //   addr = ownerAddr;
    // }
    // state.nft.owner = addr;
    // state.profileImg = nftavatar;
    // state.ownername = ownername;
    window.location.reload()
    setRegetFlag(!regetflag);
  };

  const make_bid = async () => {
    try {
      if (account) {
        const bidPrice = ethers.utils.parseEther(bidprice.toString());
        const requiredPrice = bidPrice * (10000 + royaltyFee + tradeFee ) / 10000
        setPending(true);
        const make_bid = await AUCTIONcontract.makeBid(
          NFT_ADDRESS,
          params?.tid,
          bidPrice,
          recipient,
          { value: requiredPrice }
        );
        await make_bid.wait();
        setPending(false);
        BidCloseModal();
        dispatch(makeBid(params?.tid, nftOwner, account, bidprice, recipient));
        setRegetFlag(!regetflag);
        window.location.reload(false)
      } else {
        showNotification({
          title: 'Warning',
          message: 'Please connect MetaMask',
          type: 'warning',
          insert: 'top',
          container: 'top-right'
        })
      }
    } catch (err) {
      setPending(false);
    }
  };

  const cancelAuction = async () => {
    try {
      await AUCTIONcontract.withdrawAuction(NFT_ADDRESS, params?.tid);
      setAuctionCreated(false);
      setAuctionOngoing(false)
      dispatch(updateAuction(account, params?.tid, "cancel"));
      setRegetFlag(!regetflag);
    } catch (error) {
      console.log(error);
    }
  };

  const settle_auction = async () => {
    try {
      const auction= await AUCTIONcontractRead.pizzaAuctions(NFT_ADDRESS, params?.tid)
      const currentHighestBid = auction.nftHighestBid
      const reservePrice = auction.reservePrice
      const originPrice = auction.startPrice
      if( Number(currentHighestBid) >=Number(reservePrice) && Number(originPrice) !== Number(currentHighestBid)) {
        let settle = await AUCTIONcontract.settleAuction(NFT_ADDRESS, params?.tid);
        await settle.wait();
        dispatch(settleAuction(params?.tid, account, nftOwner, recipient));
        window.location.reload(false)
      } else {
        const withdraw = await AUCTIONcontract.withdrawAuction(NFT_ADDRESS, params?.tid);
        await withdraw.wait()
        dispatch(updateAuction(account, params?.tid, "cancel"));
        window.location.reload(false)
      }
      setAuctionCreated(false);
      setAuctionOngoing(false)
      setRegetFlag(!regetflag);
    } catch (error) {
      console.log("Settle Auction ", error);
    }
  };

  const burn = async () => {
    try {
      let burn = await NFTcontract.burn(params?.tid);
      await burn.wait();
      history.push('/');
      showNotification({
        title: 'Success',
        message: 'Your NFT successfully burned',
        type: 'success',
        insert: 'top',
        container: 'top-right'
      })
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
      window.location.reload(false)
      return (<></>)
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

  // // nft.loading is true during load.
  // if (loading)
  //   return 
  //     <>
  //       <div class="fa-3x">
  //         <i class="fas fa-spinner fa-pulse"></i>
  //       </div>
  //     </>;
  // // nft.error is an Error instance in case of error.
  // if (error || !nft) return <>Error</>;

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
                  <h2>{nft?.name}</h2>
                  {auctionCreated && (Number(highestBid) > Number(buynowprice)) ? (
                    <>
                      <h3>
                        Original Price: <span>{ethers.utils.formatEther(buynowprice)} BNB</span>
                      </h3>
                      <h3>
                        Highest Bid: <span>{ethers.utils.formatEther(highestBid)} BNB</span>
                      </h3>
                    </>
                  ) : (
                    <h3>
                      Buy Now Price:{" "}
                      <span>{ethers.utils.formatEther(buynowprice)} BNB</span>
                    </h3>
                  )}

                  <div className="item-description">
                    <p>{nft?.description}</p>
                    <p>{nft?.rawData?.social}</p>
                    {auctionCreated && (Number(highestBid) === Number(buynowprice)) && (
                      <p>No Bid</p>
                    )}
                    {auctionCreated  && ( auctionOngoing ? 
                    (
                      <Countdown
                        date={(new Date(auctionCreatedAt * 1000)).getTime() + auctionDuration * 1000}
                        renderer={renderer}
                      />
                    ) : (
                      nftOwner === account ? 
                        (
                          <>
                            <p>Auction is ended</p>
                            <button className="buy-it-button" onClick={settle_auction}>
                              Settle Auction
                            </button>
                          </>
                        ) : (
                        <><p>Auction is ended</p></>
                        )
                      )
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
                                  state={{nft: nftItem, profileImg, ownername: ownerName, tid: params.tid}}
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
                                  state={{nft: nftItem, profileImg, ownername: ownerName, tid: params.tid}}
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
                              {!auctionCreated ? (
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
                                      state={{nft: nftItem, profileImg, ownername: ownerName, tid: params.tid}}
                                      startPrice={buynowprice}
                                      AUCTIONcontract={AUCTIONcontract}
                                      setAcutionCreate={setAuctionCreated}
                                    />
                                  </Modal>
                                </>
                              ) : (
                                <>
                                  { auctionCreated && auctionOngoing ? (
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
                            {highestBider !== account ? (
                              ( auctionCreated && nftOwner != account && auctionOngoing ?
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
                                              value={recipient}
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
                                </> : (
                                  !auctionCreated && <>
                                    <p>Auction is not created yet</p>
                                  </>
                                )
                              )
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
                      owner &&<>
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
                            state={{nft: nftItem, profileImg, ownername: ownerName, tid: params.tid}}
                            regetflag={regetflag}
                            setRegetFlag={setRegetFlag}
                          />
                        </Modal>
                        <button className="burn-it-button" onClick={burn}>
                          Burn
                        </button>
                      </>
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
                          <Owner state={{nft: nftItem, profileImg, ownername: ownerName}} coverImage={coverImage}/>
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
                          <BidInfo id="NFT ID" name={params?.tid} />
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
                  {
                    contentType && (contentType.includes('audio') ||contentType.includes('video') ) ? (
                      <ReactPlayer
                        width="100%"
                        height="300px"
                        url={nft?.image}
                        playing={false}
                        config={{
                          file: {
                            attributes: {
                              controlsList: 'nodownload'
                            }
                          }
                        }}
                        controls
                      />
                    ) : contentType ? contentType.includes('image') &&(
                      <MainImage nftImg={nft?.image} />
                    ) : <></>
                  }
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
