import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { NftProvider } from "use-nft";

import StarParalax from "../components/starparalax/StarParalax";
import ScrollTop from "../components/scrolltop/ScrollTop";
import SearchBar from "../components/searchbar/SearchBar";
import ArtistAvatar from "../components/artistavatar/ArtistAvatar";

import Slider from "react-slick";

// import ExclusiveDrops from "../components/exclusivedrops/ExclusiveDrops";
import FilterButton from "../components/filterbutton/FilterButton";
import Nft from "../modules/NftGet";
import HotNft from "../modules/HotNft";
// import FaqDetails from "../components/faqdetails/FaqDetails";
import { NftTokenID, topOwner, hotAuctionGet } from "../redux/actions";
import { Common } from "../redux/common";
import { rpc_provider } from "../config/contractConnect";
import Paginate from "../components/paginate/Paginate";

const options = [
  "All",
  "art",
  "photography",
  "sports",
  "athletes",
  "celebrities",
  "music",
  "gif and videos",
  "collectibles",
  "trading cards",
  "utilities",
  "virtual worlds",
  "food",
  "wine and drinks",
  "animals and pets",
  "fashion",
  "guns and rifles",
  "cars and motorcycles",
  "architecture",
  "technology",
  "games",
];

const Home = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(["active"]);
  const [chooseCategory, setChooseCategory] = useState("All");
  const { token_ids, total, top_owners, hots, searchText } = Common();

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(4)
  const [pageCount, setPageCount] = useState(0)


  useEffect(() => {
    dispatch(NftTokenID(offset, limit));
    dispatch(topOwner());
    dispatch(hotAuctionGet());
  }, [offset, limit]);

  useEffect(() => {
    setPageCount(Math.ceil(total / limit))
  }, [total, limit])


  const fetcher = ["ethers", { ethers, provider: rpc_provider }];

  var settings = {
    centerMode: true,
    centerPadding: "5px",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    slide: "> div",
    adaptiveHeight: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          slidesToScroll: 1,
        },
      },
    ],
  };

  const selectCategory = (item) => {
    let flag = [];
    setChooseCategory(item);
    options.map((value, index) => {
      if (item === value) {
        flag[index] = "active";
      } else {
        flag[index] = "";
      }
    });
    setCategory(flag);
  };

  const handlePageChange = useCallback((event) => {
    const newOffset = event.selected * limit
    setOffset(newOffset)
  }, [setOffset, limit])

  return (
    <>
      <StarParalax />
      <div className="top-artist">
        <div className="container">
          <div className="artist-list">
            <h2>Top Artists</h2>
            <ul>
              {top_owners
                ?.filter((itm, key) => itm[1].name)
                .map((item, index) => (
                  <ArtistAvatar info={item} key={index} />
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="exclusive-drops">
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
            </div> */}

      <div className="exclusive-drops">
        <div className="container">
          <div className="exclusive-drops-list">
            <h2>Hot Auctions</h2>
            <div className="exclusive-carousal">
              <NftProvider fetcher={fetcher}>
                <Slider {...settings}>
                  {hots?.map((item, index) => (
                    <HotNft key={index} tokenId={item?.tokenId} />
                  ))}
                </Slider>
              </NftProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="exclusive-drops">
        <div className="container">
          <div className="exclusive-drops-list" id="exlpore-more">
            <h2>Explore</h2>
            <SearchBar />
            <div className="filter-set">
              {options.map((item, index) => (
                <FilterButton
                  name={item}
                  active={category[index]}
                  selectCategory={selectCategory}
                  key={index}
                />
              ))}
            </div>
            <div className="main-explore-image-container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                  gridGap: "20px",
                }}
              >
                <NftProvider fetcher={fetcher}>
                  {token_ids?.map((item, index) => (
                    <Nft
                      tokenId={item}
                      category={chooseCategory}
                      searchText={searchText}
                      key={index}
                    />
                  ))}
                </NftProvider>
              </div>
              {/* <div className="loadmore-button">
                {((currentPage + 1 ) * pageSize < totalCount) && <button onClick={() => setOffset(offset + pageSize)}>Load More <i className="fas fa-arrow-right"></i></button>}
            </div> */}
            </div>
            <div id="react-paginate">
              <Paginate onPageChange={handlePageChange} pageCount={pageCount} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="faq-container">
        <div className="container">
          <a href="http://www.nftsmarket.cc/" target="_blank"><h2>FAQ</h2></a>
        </div>
      </div> */}
      <div className="container">
        <div className="help-content-container">
          <div className="help-content">
            <h4>Setting Your Wallet</h4>
            <p>
              Best to setup your wallet, either Metamask or Trust Wallet app. Then connect it to PizzaNFT.studio Marketplace.  Click on FAQ for more help. Learn about Wallets Connection Tutorial
            </p>
          </div>
          <div className="help-content">
            <h4>Artists, Create Your Great Collection</h4>
            <p>
              Just click Create, then set up your collection to mint only (NFT not for sale), sell as buy now (NFT for sell with Buy price) or sell as auction (NFT selling with bid and reserves).  Add royalties to your collection. Add your social links. Add a description.  Add your avatar profile image & banner images (1478px x200px).  Cost to Sell NFT is $5 (in $PIZZA TOKEN), you must have $PIZZA token to sell. See above BUY link to get $PIZZA native token to Sell.  Set your Selling price in BNB’s. Get Paid in BNBs (Binance smart chain)
            </p>
          </div>
          <div className="help-content">
            <h4>Adding Your NFT’s</h4>
            <p>
              You can upload your original works such as an image, a video, an audio file or a 3D art.  Add title name and then write a description.  Cost to Sell NFT is $5 (in $PIZZA TOKEN), you must have $PIZZA token to sell. See above BUY link to get $PIZZA native token to Sell. You can add up to 20% for Royalties on your NFTs.
            </p>
          </div>
          <div className="help-content">
            <h4>Listing Your NFTs For Sale</h4>
            <p>
              There are choices of auctions or a fixed-price selling price listings.  Or you can mint only and decline to sell with a price listed.  You can choose what you want to sell your NFTs.  We can assist any questions, check in FAQ above links. Cost to Sell NFT is $5 (in $PIZZA TOKEN), you must have $PIZZA token to sell. See above BUY link to get $PIZZA native token to Sell.
            </p>
          </div>
          <div className="help-content">
            <h4>Here To Explore NFT’s And Buy An NFT Collection</h4>
            <p>
              Connect your Metamask or Trust Wallet.  Make sure you have BNB (Smart Chain as network). You will need BNB smart chain crypto currency to buy any NFTs. Make sure you have extra NFTs for gas and transaction fees.
            </p>
          </div>
        </div>
      </div>

      <ScrollTop />
    </>
  );
};

export default Home;
