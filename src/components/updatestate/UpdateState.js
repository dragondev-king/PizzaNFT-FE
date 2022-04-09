import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Common } from "../../redux/common";
import { showNotification } from "../../utils/helpers";

const UpdateState = ({ setIsOpen, state, regetflag, setRegetFlag, isSale, isAuction, isMintOnly }) => {
  const [pending, setPending] = useState(false);
  const [putOnSale, setPutOnSale] = useState(false);
  const [buynowState, setBuynowState] = useState(false);
  const [viewState, setViewState] = useState(false);
  const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
  }
  const { NFTcontract } = Common();
  const update = useCallback(async() => {
    try {
      let event
      if (putOnSale) {
        event = NFTcontract.updatePutOnSale(state?.tid)
      }
      if (buynowState) {
        event = NFTcontract.updateBuynowState(state?.tid)
      }
      if (viewState) {
        event = NFTcontract.updateNFTViewState(state?.tid)
      }
      else {
        showNotification({
          title: 'Warning',
          message: 'Please select a state',
          type: 'warning',
          insert: 'top',
          container: 'top-right'
        })
        return
      }
      setPending(true)
      await event.wait()
      setPending(false)
      closeModal()
      setRegetFlag(!regetflag)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
    }
  }, [state?.tid, putOnSale, buynowState, viewState])

  return (
    <div style={{width: '300px'}}>
      <div className="standards-container ">
        <label className="checkbox-button">
          <button
            className="btn btn-default btn-full-width"
            disabled={isAuction}
            onClick={() => {
              setPutOnSale(true);
              setBuynowState(false);
              setViewState(false);
            }}
          >
            <span style={ isAuction ? {backgroundColor: 'darkgrey'} : (putOnSale ? { backgroundColor: 'rebeccapurple' }: {})}>Bid Price</span>
          </button>
        </label>

        <label className="checkbox-button">
          <button
            className="btn btn-default btn-full-width"
            disabled={isSale}
            onClick={() => {
              setPutOnSale(false);
              setBuynowState(true);
              setViewState(false);
            }}
          >
            <span style={ isSale ? {backgroundColor: 'darkgrey'} : (buynowState ? { backgroundColor: 'rebeccapurple' }: {})}>Buy Now</span>
          </button>
        </label>
        <label className="checkbox-button">
          <button
            className="btn btn-default btn-full-width"
            disabled={isMintOnly}
            onClick={() => {
              setPutOnSale(false);
              setBuynowState(false);
              setViewState(true);
            }}
          >
           <span style={ isMintOnly ? {backgroundColor: 'darkgrey'} : (viewState ? { backgroundColor: 'rebeccapurple' }: {})}>Mint Only</span>
          </button>
        </label>
      </div>
      <div className="col-md-6 col-sm-6">
          {pending ? (
            <button className="btn btn-default" disabled>
              Updating
            </button>
          ) : (
            <button
              className="btn btn-default"
              onClick={update}
            >
              Update
            </button>
          )}
        </div>
      <div className="col-md-6 col-sm-6">
        <button
          className="btn btn-default"
          onClick={closeModal}
          style={{ marginLeft: '40%' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default UpdateState
