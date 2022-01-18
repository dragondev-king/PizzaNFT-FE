import { ethers } from "ethers";
import {
  NFT_ADDRESS,
  NFT_ABI,
  FT_ADDRESS,
  FT_ABI,
  AUCTION_ADDRESS,
  AUCTION_ABI,
} from "./contract";


let NFTcontract;
let FTcontract;
let AUCTIONcontract;

const rpc_provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/e4584f130b226b97f5b49b8c/bsc/testnet/");
const NFTcontractRead = new ethers.Contract(NFT_ADDRESS, NFT_ABI, rpc_provider);
const AUCTIONcontractRead = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, rpc_provider);

if(window.ethereum === undefined) {
  alert("MataMask is not installed.")
  NFTcontract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, rpc_provider);
  FTcontract = new ethers.Contract(FT_ADDRESS, FT_ABI, rpc_provider);
  AUCTIONcontract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, rpc_provider);
}  else {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider?.getSigner();
  NFTcontract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
  FTcontract = new ethers.Contract(FT_ADDRESS, FT_ABI, signer);
  AUCTIONcontract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, signer);
}


export {rpc_provider, NFTcontract, FTcontract, AUCTIONcontract, NFTcontractRead, AUCTIONcontractRead}
