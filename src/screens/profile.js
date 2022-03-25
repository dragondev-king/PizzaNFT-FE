import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { NftProvider } from "use-nft";
import FilterButton from "../components/filterbutton/FilterButton";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ProfileHeader from "../components/profileheader/ProfileHeader";
import Nft from "../modules/NftGet";
import { rpc_provider } from "../config/contractConnect";

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
];

const Profile = () => {
  const { state } = useLocation();
  const [ids, setIds] = useState([]);
  const fetcher = ["ethers", { ethers, provider: rpc_provider }];
  const [category, setCategory] = useState(["active"]);
  const [chooseCategory, setChooseCategory] = useState("All");
  const [pageSize, setPageSize] = useState(0)
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [limit, setLimit] = useState(8)
  useEffect(() => {
    let midArr = [];
    try {
      axios
        .get(
          `https://deep-index.moralis.io/api/v2/${state?.nft?.owner}/nft?chain=bsc&format=decimal&token_addresses=${process.env.REACT_APP_NFT_ADDRESS}&limit=${limit}&offset=${offset}`,
          {
            headers: {
              accept: "application/json",
              "X-API-Key": process.env.REACT_APP_MORALIS_KEY,
            },
          }
        )
        .then((res) => {
          if (res.status != 200) return;
          res.data.result.map((item) => {
            midArr.push(item.token_id);
          });
          setIds([...ids, ...midArr]);
          setPageSize(res.data.page_size)
          setTotalCount(res.data.total)
          setCurrentPage(res.data.page)
        });
    } catch (err) {}
  }, [limit, offset]);

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
  return (
    <>
      <Breadcrumb name="Profile" />
      <ProfileHeader nft={state} />
      <div className="exclusive-drops">
        <div className="container">
          <div className="exclusive-drops-list">
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
                  {ids.map((item, index) => (
                    <Nft tokenId={item} key={index} category={chooseCategory} />
                  ))}
                </NftProvider>
              </div>
            </div>
          </div>
          <div className="loadmore-button">
              {((currentPage + 1 ) * pageSize < totalCount) && <button onClick={() => setOffset(offset + pageSize)}>Load More <i className="fas fa-arrow-right"></i></button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
