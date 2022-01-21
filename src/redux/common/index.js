
import { useSelector } from "react-redux";

export function Common() { 
    const { status, account } = useSelector((state) => state.data?.wallet_info ? state.data?.wallet_info : {status:'disconnected', account:''});
    const { profileImg, name, profileUrl } = useSelector( (state) => state.data[0] ? state.data[0] : "");
    const { top_owners } = useSelector( (state) => state.data);
    const { token_ids } = useSelector( (state) => state.data);
    const { bids } = useSelector( (state) => state.data);
    const { historys } = useSelector( (state) => state.data);
    const { hots } = useSelector( (state) => state.data);
    const { bidstatus } = useSelector( (state) => state.data);

    useSelector( (state) => {
        console.log(state.data);
    })


    return { account, status, profileImg, name, profileUrl, top_owners, token_ids, bids, historys, hots, bidstatus }
}