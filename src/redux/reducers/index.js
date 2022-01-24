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
  WALLET_DISCONNECT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case METAMASK_CONNECT:
      return {
        ...state,
        ...action.payload
      };
    case GET_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    case GET_NFT_ID:
      return {
        ...state,
        ...action.payload
      };
    case GET_TOP_OWNER:
      return { 
        ...state,
        ...action.payload
      };
    case GET_SELECTED_USER_INFO:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_USERINFO:
      return {
        ...state,
        ...action.payload
      }
    case HISTORY_FIND_ALL:
      return {
        ...state,
        ...action.payload
      }
    case BID_FIND_ALL:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_PRICE:
      return {
        ...state,
        ...action.payload
      }
    case HOT_AUCTION_GET:
      return {
        ...state,
        ...action.payload
      }
    case BID_FIND_ONE:
      return {
        ...state,
        ...action.payload
      }
    case WALLET_CONNECT:
      return {
        ...state,
        ...action.payload
      }
    case WALLET_DISCONNECT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return "";
  }
};
