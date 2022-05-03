
import { useSelector } from "react-redux";
export function Common() { 
    const { profileImg, name, profileUrl, email, coverImg, facebook, bio, instagram, discord, twitter } = useSelector( (state) => state.data[0] ? state.data[0] : "");
    const { top_owners } = useSelector( (state) => state.data);
    const { token_ids, total } = useSelector( (state) => state.data);
    const { bids } = useSelector( (state) => state.data);
    const { historys } = useSelector( (state) => state.data);
    const { hots } = useSelector( (state) => state.data);
    const { bidstatus } = useSelector( (state) => state.data);
    const { NFTcontract, AUCTIONcontract, account, mintPrice, FTcontract } = useSelector( (state) => state.data);
    const { followInfos } = useSelector( (state) => state.data);
    const { searchText } = useSelector( (state) => state.data);
    return { account, profileImg, name, profileUrl, email, coverImg, facebook, bio, instagram, discord, twitter, top_owners, token_ids, total, bids, historys, hots, bidstatus, NFTcontract, AUCTIONcontract, mintPrice, FTcontract, followInfos, searchText }
}
