import { ethers } from "ethers";
import {
  NFT_ADDRESS,
  NFT_ABI,
  AUCTION_ADDRESS,
  AUCTION_ABI,
} from "./contract";

const rpc_provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

const NFTcontractRead = new ethers.Contract(NFT_ADDRESS, NFT_ABI, rpc_provider);
const AUCTIONcontractRead = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, rpc_provider);
  
export { rpc_provider, NFTcontractRead, AUCTIONcontractRead }