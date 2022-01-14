import React, { useEffect, useState } from 'react'
import  { ethers }  from "ethers"
import axios from "axios"
import { NftProvider } from "use-nft"

import StarParalax from '../components/starparalax/StarParalax'
import ScrollTop from '../components/scrolltop/ScrollTop'
import SearchBar from '../components/searchbar/SearchBar'
import ArtistAvatar from '../components/artistavatar/ArtistAvatar'

import Slider from "react-slick";

import ExclusiveDrops from '../components/exclusivedrops/ExclusiveDrops'
import HotAuction from '../components/hotauction/HotAuction'
import FilterButton from '../components/filterbutton/FilterButton'
import Nft from '../modules/NftGet'

const provider = new ethers.providers.Web3Provider(window?.ethereum);
const fetcher = ["ethers", { ethers, provider: provider }]

const Home = () => {
    const [ids, setIds] = useState([]);

    useEffect( ()=> {
        let midArr = [];
        axios.get(`https://deep-index.moralis.io/api/v2/nft/${process.env.REACT_APP_NFT_ADDRESS}?chain=bsc%20testnet&format=decimal`, {headers:{'accept':'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_KEY }})
        .then( res => {
            if(res.status != 200 ) return
            res.data.result.map(item => {
                midArr.push(item.token_id)
            })
            setIds([...ids, ...midArr])
        })
    }, [])


    var settings = {
        centerMode: true,
        centerPadding: '5px',
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        slide: '> div',
        adaptiveHeight: true,

        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                centerPadding: '20px',
                slidesToScroll: 1,
            }
        }]

    };

    return (
        <>
            <StarParalax />
            <SearchBar />

            <div className="top-artist">
                <div className="container">
                    <div className="artist-list">
                        <h2>Top Artists</h2>
                        <ul>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                            <li><a href="/profile"><ArtistAvatar /></a></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="exclusive-drops">
                <div className="container">
                    <div className="exclusive-drops-list">
                        <h2>Exclusive Drops</h2>
                        <div className="exclusive-carousal">
                            <Slider {...settings}>
                                <ExclusiveDrops />
                                <ExclusiveDrops />
                                <ExclusiveDrops />
                                <ExclusiveDrops />
                                <ExclusiveDrops />
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <div className="exclusive-drops">
                <div className="container">
                    <div className="exclusive-drops-list">
                        <h2>Hot Auctions</h2>
                        <div className="exclusive-carousal">
                            <Slider {...settings}>
                                <HotAuction />
                                <HotAuction />
                                <HotAuction />
                                <HotAuction />
                                <HotAuction />
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <div className="exclusive-drops">
                <div className="container">
                    <div className="exclusive-drops-list">
                        <h2>Explore</h2>
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
                            <div className="loadmore-button">
                                <button>Load More <i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <ScrollTop /> */}

        </>
    )
}

export default Home
