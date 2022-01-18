import {
  METAMASK_CONNECT, 
  GET_USER_INFO, 
  GET_TOP_OWNER, 
  GET_NFT_ID, 
  GET_SELECTED_USER_INFO, 
  UPDATE_PRICE, 
  UPDATE_USERINFO,
  HISTORY_FIND_ALL,
  BID_FILD_ALL
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
    case BID_FILD_ALL:
      return {
        ...state,
        ...action.payload
      }
    default:
      return "";
  }
};
