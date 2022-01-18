import axios  from 'axios'
import { ethers } from 'ethers'
import { NFTcontractRead } from "../../config/contractConnect"
import { 
  METAMASK_CONNECT, 
  GET_USER_INFO, 
  GET_TOP_OWNER, 
  GET_NFT_ID, 
  GET_SELECTED_USER_INFO, 
  UPDATE_PRICE, 
  UPDATE_USERINFO, 
  HISTORY_FIND_ALL,
  BID_FILD_ALL,
  MINT,
  AUCTION_CREATED,
  TRANSFER,
  PRICE_UPDATED
} from "../types";

const BACKEND_API = `${process.env.REACT_APP_BACKEND_API}/api`; 

export const walletConnect = ( wallet_info ) => ( dispatch, getState ) => {
  try {
    dispatch({
      type: METAMASK_CONNECT,
      payload: {
        wallet_info
      }
    })
  } catch (error) {
    console.log("MetaMask Error ", error);
  }
}

export const userInfo = ( account ) => ( dispatch, getState ) => {
  try {
    axios.get(`${BACKEND_API}/profile/${account}`)
    .then( (res) => {
      if(res.status != 200) return
      dispatch({
        type: GET_USER_INFO,
        payload: res.data
      })
    })
  } catch (error) {
    console.log("User Info Get ", error);
  }
}

export const NftTokenID = () => ( dispatch, getState ) => {
  try {
    axios.get(`https://deep-index.moralis.io/api/v2/nft/${process.env.REACT_APP_NFT_ADDRESS}?chain=bsc%20testnet&format=decimal`, {headers:{'accept':'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_KEY }})
    .then( res => {
        if(res.status != 200 ) return
        let midArr = [];
        res.data.result.map(item => {
            midArr.push(item.token_id)
        })

        dispatch({
          type: GET_NFT_ID,
          payload: {
            token_ids: midArr
          }
        })
    })  
  } catch (error) {
    console.log("Get NFT Token IDS ", error);
  }
}

export const topOwner = () => ( dispatch, getState ) => {
  try {
    axios.get(`https://deep-index.moralis.io/api/v2/nft/${process.env.REACT_APP_NFT_ADDRESS}/owners?chain=bsc%20testnet&format=decimal`, {headers:{'accept':'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_KEY }})
    .then(async (res) => {
        if(res.status != 200 ) return
        let owner_info = []

        for(let i = 0; i < res.data.result.length; i++) {
            const item = res.data.result[i]
            
            if (ethers.utils.getAddress(item.token_address) === ethers.utils.getAddress(process.env.REACT_APP_NFT_ADDRESS)) {
                
                let price = await NFTcontractRead.price(item.token_id);
                
                if( owner_info[item.owner_of] === undefined ) {
                    let profileImg = ""
                    let name = ""

                    try {
                        await axios.get(`${BACKEND_API}/profile/${ethers.utils.getAddress(item.owner_of)}`)
                        .then( (res) => {
                            if(res.status != 200) return
                            profileImg = res.data[0]?.profileImg
                            name = res.data[0]?.name
                        })
                    } catch (err){}

                    owner_info[item.owner_of] = {
                        count: 1,
                        tokens: [item.token_id],
                        price: +ethers.utils.formatEther(price),
                        profileImg: profileImg, 
                        name: name
                    }
                } else {
                    owner_info[item.owner_of].count ++
                    owner_info[item.owner_of].tokens.push( item.token_id )
                    owner_info[item.owner_of].price += +ethers.utils.formatEther(price)
                }
            }
        }

        let owner_info_sort = Object.entries(owner_info)
        owner_info_sort.sort((a, b) => 
            b[1].price - a[1].price
        )

        dispatch({
          type: GET_TOP_OWNER,
          payload: {
            top_owners: owner_info_sort.slice(0, 6)
          }
        })
    })
  } catch (error) {
    console.log("Get Top Owner ", error);
  }
}

export const selectedUserInfo = ( account ) => ( dispatch, getState ) => {
  try {
    axios.get(`${BACKEND_API}/profile/${account}`)
    .then( (res) => {
      if(res.status != 200) return
      dispatch({
        type: GET_SELECTED_USER_INFO,
        payload: res.data
      })
    })
  } catch (error) {
    console.log("User Info Get ", error);
  }
}

export const updatePrice = ( tid, price ) => ( dispatch, getState ) => {
   try {

   } catch (error) {
     console.log("Update Price ", error)
   }
}

export const updateUserInfo = (account, name, profileImg, profileUrl) => (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append('profileImg', profileImg);
    formData.append("name", name);
    formData.append("profileUrl", profileUrl);

    axios.put(`${BACKEND_API}/profile/${ethers.utils.getAddress(account)}`, formData, {'Accept':'multipart/form-data'})
    .then(res => {
        if(res.status == 200) {
          dispatch({
            type: UPDATE_USERINFO,
            payload: {
              profileImg: profileImg, 
              name: name,
              profileUrl: profileUrl
            }
          })
          alert("Success!");
        } else {
          alert("Failed!");
        }
    })
  } catch (error){
    console.log("userInfo Update ", error);
  }
}

export const createAuction = (owner, tokenId) => (dispatch, getState) => {
  try {
    axios.post(`${BACKEND_API}/auction/create`, {owner: owner, tokenId: tokenId})
    .then(res => {
      if(res.status == 200) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    })
  } catch (error) {
    console.log("Cancel Auction ", error)
  }
}

export const updateAuction = (owner, tokenId, status) => (dispatch, getState) => {
  try {
    axios.post(`${BACKEND_API}/auction/update`, {owner: owner, tokenId: tokenId, status: status})
    .then(res => {
      if(res.status == 200) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    })
  } catch (error) {
    console.log("Update Auction ", error)
  }
}

export const makeBid = (tokenId, nftOwner, bidder, amount) => (dispatch, getState) => {
  try {
    axios.post(`${BACKEND_API}/bid/create`, {nftOwner: nftOwner, tokenId: tokenId, bidder: bidder, amount: amount})
    .then(res => {
      if(res.status == 200) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    })
  } catch (error){
    console.log("MakeBid ", error)
  }
}

export const updateBid = (tokenId, nftOwner, bidder, amount, status) => (dispatch, getState) => {
  try {
    axios.post(`${BACKEND_API}/bid/update`, {owner: nftOwner, tokenId: tokenId, status: status})
    .then(res => {
      if(res.status == 200) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    })
  } catch (error){
    console.log("Update Bid ", error)
  }
}

export const createHistory = (tokenId, event, from, to, prevAmount, currAmount) => (dispatch, getState) => {
  try {
    let newHistory = { tokenId: tokenId, event: event };
    switch (event) {
      case MINT:
        {
          newHistory.currAmount = currAmount;
          break;
        }
      case AUCTION_CREATED:
        {
          newHistory.from = from;
          break;
        }
      case TRANSFER:
        {
          newHistory.from = from;
          newHistory.to = to;
          break;
        }
      case PRICE_UPDATED:
        {
          newHistory.from = from;
          newHistory.prevAmount = prevAmount;
          newHistory.currAmount = currAmount;
        }
    }
    axios.post(`${BACKEND_API}/history/create`, newHistory)
    .then(res => {
      if(res.status == 200) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    })
  } catch (error) {
    console.log("create history ", error)
  }
}

export const historyFindAll = (tokenId) => (dispatch, getState) => {
  try {
    axios.get(`${BACKEND_API}/history/all`, {tokenId: tokenId})
    .then( (res) => {
      if(res.status != 200) return
      dispatch({
        type: HISTORY_FIND_ALL,
        payload: res.data
      })
    })
  } catch (error) {
    console.log(error)
  }
}

export const bidFindAll = (tokenId, owner, status="create") => (dispatch, getState) => {
  try {
    axios.get(`${BACKEND_API}/bid/all`, {tokenId: tokenId, owner:owner, status: status})
    .then( (res) => {
      if(res.status != 200) return
      dispatch({
        type: BID_FILD_ALL,
        payload: res.data
      })
    })
  } catch (error) {
    console.log(error)
  }
}