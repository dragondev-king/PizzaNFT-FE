import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { NftProvider } from "use-nft";
import FilterButton from "../components/filterbutton/FilterButton";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ProfileHeader from "../components/profileheader/ProfileHeader";
import Nft from "../modules/NftGet";
import { rpc_provider } from "../config/contractConnect";
import Paginate from "../components/paginate/Paginate";
import { Common } from "../redux/common";
import ProfileBreadcrumb from "../components/profilebreadcrumb/ProfileBreadcrumb";

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

const Profile = () => {
  const params = useParams()
  const { account } = Common()
  const { state } = useLocation();
  const [ids, setIds] = useState([]);
  const fetcher = ["ethers", { ethers, provider: rpc_provider }];
  const [category, setCategory] = useState(["active"]);
  const [chooseCategory, setChooseCategory] = useState("All");
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(4)
  const [pageCount, setPageCount] = useState(0)
  const [profileImg, setProfileImg] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [profileUrl, setProfileUrl] = useState("")
  const [email, setEmail] = useState("")
  const [facebook, setFacebook] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    let midArr = [];
    if(params?.account) {
      try {
        axios
        .get(`${process.env.REACT_APP_BACKEND_API}/api/nfts/${params?.account}?offset=${offset}&limit=${limit}`)
        .then((res) => {
          if (res.status != 200) return;
          res.data.nftIDs.map((item) => {
            midArr.push(item.tokenId);
          });
          setIds([...midArr]);
          setPageCount(Math.ceil(res.data.total / limit))
        });
      } catch (err) { }
    }
  }, [limit, offset, account]);

  useEffect(async () => {
    if (params?.account) {
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/profile/${ethers.utils.getAddress(params.account)}`
        )
          .then((res) => {
            setProfileImg(res.data[0]?.profileImg)
            setOwnerName(res.data[0]?.name)
            setCoverImage(res.data[0]?.coverImg)
            setProfileUrl(res.data[0]?.profileUrl)
            setEmail(res.data[0]?.email)
            setFacebook(res.data[0]?.facebook)
            setBio(res.data[0]?.bio)
          });
      } catch (err) { }
    }
  }, [setProfileImg, setOwnerName, setCoverImage, params.account])

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
      <ProfileBreadcrumb name="Profile" />
      <ProfileHeader data={{ owner: params.account, coverImage, profileImg, ownername: ownerName, nft: { owner: params.account } }} />
      <div className="container">
        <div className="bio-container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        {
          (account && account === params?.account) &&
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-edit-profile"><a href="/edit" style={{ textDecoration: 'none', color: 'white' }}>Edit profile</a></button>
          </div>
        }
      </div>
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
            <div id="react-paginate">
              <Paginate onPageChange={handlePageChange} pageCount={pageCount} />
            </div>
          </div>
          {/* <div className="loadmore-button">
              {((currentPage + 1 ) * pageSize < totalCount) && <button onClick={() => setOffset(offset + pageSize)}>Load More <i className="fas fa-arrow-right"></i></button>}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
