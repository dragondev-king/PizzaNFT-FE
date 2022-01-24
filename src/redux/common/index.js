
import { useSelector } from "react-redux";

export function Common() { 
    const { profileImg, name, profileUrl } = useSelector( (state) => state.data[0] ? state.data[0] : "");
    const { top_owners } = useSelector( (state) => state.data);
    const { token_ids } = useSelector( (state) => state.data);
    const { bids } = useSelector( (state) => state.data);
    const { historys } = useSelector( (state) => state.data);
    const { hots } = useSelector( (state) => state.data);
    const { bidstatus } = useSelector( (state) => state.data);
    const { NFTcontract, FTcontract, AUCTIONcontract, account } = useSelector( (state) => state.data);

    return { account, profileImg, name, profileUrl, top_owners, token_ids, bids, historys, hots, bidstatus, NFTcontract, FTcontract, AUCTIONcontract }
}