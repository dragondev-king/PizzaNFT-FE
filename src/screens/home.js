import React, { useEffect } from 'react'
import  { ethers }  from "ethers"
import { useDispatch } from "react-redux"
import { NftProvider } from "use-nft"

import StarParalax from '../components/starparalax/StarParalax'
import ScrollTop from '../components/scrolltop/ScrollTop'
import SearchBar from '../components/searchbar/SearchBar'
import ArtistAvatar from '../components/artistavatar/ArtistAvatar'

import Slider from "react-slick"

import ExclusiveDrops from '../components/exclusivedrops/ExclusiveDrops'
import FilterButton from '../components/filterbutton/FilterButton'
import Nft from '../modules/NftGet'
import HotNft from '../modules/HotNft'
import FaqDetails from '../components/faqdetails/FaqDetails'
import { NftTokenID, topOwner, hotAuctionGet } from '../redux/actions'
import { Common } from "../redux/common"
import { rpc_provider } from "../config/contractConnect"

const fetcher = ["ethers", { ethers, provider: rpc_provider }]

const Home = () => {
    const dispatch = useDispatch();

    useEffect( ()=> {
        dispatch ( NftTokenID() );
        dispatch ( topOwner() );
        dispatch ( hotAuctionGet() );
    }, [])

    const { token_ids, top_owners, hots } = Common();

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
                            {
                                top_owners?.map( (item, index) => 
                                    <ArtistAvatar info={item} key={index} />
                                )
                            }
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
                            <NftProvider fetcher={fetcher}>
                                <Slider {...settings}>
                                    {
                                        hots?.map( (item, index) => 
                                            <HotNft key={index} tokenId={item?.tokenId}/>
                                        )
                                    }
                                </Slider>
                            </NftProvider>
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
                                        token_ids?.map( (item, index) => 
                                            <Nft tokenId={item} key={index} />
                                        ) 
                                    }
                                </NftProvider>
                            </div>
                            {/* <div className="loadmore-button">
                                <button>Load More <i className="fas fa-arrow-right"></i></button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="faq-container">
                <div className="container">
                    <FaqDetails />
                </div>
            </div>

            {/* <ScrollTop /> */}

        </>
    )
}

export default Home
