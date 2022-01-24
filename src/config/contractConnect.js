import { ethers } from "ethers";
import {
  NFT_ADDRESS,
  NFT_ABI,
  AUCTION_ADDRESS,
  AUCTION_ABI,
} from "./contract";

const rpc_provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/e4584f130b226b97f5b49b8c/bsc/testnet/");

const NFTcontractRead = new ethers.Contract(NFT_ADDRESS, NFT_ABI, rpc_provider);
const AUCTIONcontractRead = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, rpc_provider);
  
export { rpc_provider, NFTcontractRead, AUCTIONcontractRead }