import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ethers } from 'ethers'
import { useDispatch } from "react-redux";
import { NFT_ADDRESS, AUCTION_ADDRESS } from "../../config/contract";
import { Common } from "../../redux/common";
import { createAuction } from "../../redux/actions";
import { showNotification } from "../../utils/helpers";

const CreateAuction = ({ setIsOpen, state, startPrice, setAcutionCreate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { account, AUCTIONcontract, NFTcontract } = Common();
  const [reservedPrice, setReservedPrice] = useState(ethers.utils.formatEther(startPrice));
  const [pending, setPending] = useState(false);
  const [period, setPeriod] = useState(0)

  const create_auction = async () => {
    try {
      if (account) {
        const rsvP = ethers.utils.parseEther(reservedPrice)
        if (rsvP && parseInt(rsvP, 10) >= parseInt(startPrice, 10)) {
          const nft_send = await NFTcontract.approve(AUCTION_ADDRESS, state?.tid);
          setPending(true);
          await nft_send.wait();
          const creat_auction = await AUCTIONcontract.createDefaultNFTAuction(
            NFT_ADDRESS,
            state?.tid,
            startPrice,
            rsvP,
            Number(period) * 3600,
            0
          );
         await creat_auction.wait();
          setAcutionCreate(true);
          dispatch(createAuction(account, state?.tid));
          setPending(false);
          window.location.reload(false)
        } else {
          showNotification({
            title: 'Warning',
            message: 'Reserved price should be higher than start price',
            type: 'danger',
            insert: 'top',
            container: 'top-right'
          })
        }
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

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="row" style={{ width: "350px" }}>
        <div className="col-md-12">
          <div className="form-group">
            <label>Start Price (BNB)</label>
            <input
              className="form-control"
              type="number"
              id="itemname"
              value={ethers.utils.formatEther(startPrice)}
              disabled
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Reserved Price (BNB)</label>
            <input
              className="form-control"
              type="number"
              id="itemname"
              onChange={(e) => setReservedPrice(e.target.value)}
              value={reservedPrice}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Auction Period (hours)</label>
            <input
              className="form-control"
              type="number"
              id="itemname"
              onChange={(e) => setPeriod(e.target.value)}
              value={period}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          {pending ? (
            <button className="btn btn-default" disabled>
              Creating
            </button>
          ) : (
            <button className="btn btn-default" onClick={create_auction}>
              Create
            </button>
          )}
        </div>
        <div className="col-md-6 col-sm-6">
          <button
            className="btn btn-default"
            onClick={closeModal}
            style={{ float: "right" }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAuction;
