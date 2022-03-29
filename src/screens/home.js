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
  const { token_ids, page, page_size, total, top_owners, hots, searchText } = Common();
  
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [limit, setLimit] = useState(8)
  const [pageCount, setPageCount] = useState(0)
  

  useEffect(() => {
    dispatch(NftTokenID(offset, limit));
    dispatch(topOwner());
    dispatch(hotAuctionGet());
  }, [offset, limit]);

  useEffect(() => {
    setCurrentPage(page)
    setPageSize(page_size)
    setTotalCount(total)
    setPageCount(Math.ceil(total / limit))
  }, [page, page_size, total, limit])


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

      <div className="faq-container">
        <div className="container">
          <a href="http://www.nftsmarket.cc/" target="_blank"><h2>FAQ</h2></a>
        </div>
      </div>

      <ScrollTop />
    </>
  );
};

export default Home;
