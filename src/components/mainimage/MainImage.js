import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainImage = ({ nftImg }) => {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <div style={{display: loading ? "none" : "block"}}>
        <img src={nftImg} alt="" className="img-responsive" style={{ width: "100%", height: "100%" }} onLoad={() => setLoading(false)} />
      </div>
      <div style={{display: loading ? "block !important" : "none"}}>
        <Skeleton height={320} highlightColor='#aaaaaa' borderRadius='1.25rem'/>
      </div>
    </>
  );
};

export default MainImage;
