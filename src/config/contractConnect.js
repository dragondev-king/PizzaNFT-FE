import { ethers } from "ethers";
import {
  NFT_ADDRESS,
  NFT_ABI,
  FT_ADDRESS,
  FT_ABI,
  AUCTION_ADDRESS,
  AUCTION_ABI,
} from "./contract";

const provider = new ethers.providers.Web3Provider(window?.ethereum);
const signer = provider.getSigner();
console.log(signer);
const NFTcontract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
const FTcontract = new ethers.Contract(FT_ADDRESS, FT_ABI, signer);
const AUCTIONcontract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, signer);

export {provider, signer, NFTcontract, FTcontract, AUCTIONcontract}
