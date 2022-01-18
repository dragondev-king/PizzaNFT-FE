import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ethers }  from "ethers"
import { NftProvider } from "use-nft"
import FilterButton from '../components/filterbutton/FilterButton'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProfileHeader from '../components/profileheader/ProfileHeader'
import Nft from '../modules/NftGet'
import { rpc_provider } from "../config/contractConnect"

const fetcher = ["ethers", { ethers, provider: rpc_provider }]

const Profile = () => {
    const { state } = useLocation();
    const [ids, setIds] = useState([]);

    useEffect( ()=> {
        let midArr = [];
        try {
            axios.get(`https://deep-index.moralis.io/api/v2/${state?.nft?.owner}/nft?chain=bsc%20testnet&format=decimal&token_addresses=${process.env.REACT_APP_NFT_ADDRESS}`, {headers:{'accept':'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_KEY }})
            .then( res => {
                if(res.status != 200 ) return
                res.data.result.map(item => {
                    midArr.push(item.token_id)
                })
                setIds([...ids, ...midArr])
            })
        } catch (err) {}
    }, [])
    return (
        <>
            <Breadcrumb name="Profile" />
            <ProfileHeader nft={state} />
            <div className="exclusive-drops">
                <div className="container">
                    <div className="exclusive-drops-list">
                        <div className="filter-set">
                            <FilterButton name="All" />
                            <FilterButton name="Filter-i" />
                            <FilterButton name="Filter-ii" />
                            <FilterButton name="Filter-iii" />
                            <FilterButton name="Filter-iv" />
                        </div>
                        <div className="main-explore-image-container">
                            <div style={{"display":'grid', 'gridTemplateColumns':'auto auto auto auto', 'gridGap':'20px'}}>
                                <NftProvider fetcher={fetcher}>
                                    {
                                        
                                        ids.map( (item, index) => 
                                            <Nft tokenId={item} key={index} />
                                        )
                                    }
                                </NftProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
