import {
  METAMASK_CONNECT, 
  GET_USER_INFO, 
  GET_TOP_OWNER, 
  GET_NFT_ID, 
  GET_SELECTED_USER_INFO, 
  UPDATE_PRICE, 
  UPDATE_USERINFO,
  HISTORY_FIND_ALL,
  BID_FIND_ALL,
  HOT_AUCTION_GET,
  BID_FIND_ONE,
  WALLET_CONNECT,
  WALLET_DISCONNECT,
  GET_FOLLOW,
  SEARCH_TEXT,
  UPDATE_USERINFO_NO_PROFILE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case METAMASK_CONNECT:
    case GET_USER_INFO:
    case GET_NFT_ID:
    case GET_TOP_OWNER:
    case GET_SELECTED_USER_INFO:
    case UPDATE_USERINFO:
    case HISTORY_FIND_ALL:
    case BID_FIND_ALL:
    case UPDATE_PRICE:
    case HOT_AUCTION_GET:
    case BID_FIND_ONE:
    case WALLET_CONNECT:
    case WALLET_DISCONNECT:
    case GET_FOLLOW:
    case SEARCH_TEXT:
    case UPDATE_USERINFO_NO_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return "";
  }
};
