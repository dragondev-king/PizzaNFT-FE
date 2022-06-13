import React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const BidInfo = (props) => {
  return (
    <>
      <div className="main-bid-container">
        <div className="bid-description bid-info">
          <h6>{props.id || <Skeleton highlightColor='#aaaaaa' />}</h6>
          {
            props?.prefix ? (
              <a target="_blank" href={`https://bscscan.com/${props.prefix}/${props.name}`}><h4>{props.name || <Skeleton highlightColor='#aaaaaa' />}</h4></a>
            ) : (
              <h4>{props?.name || <Skeleton highlightColor='#aaaaaa' />}</h4>
            )
          }

      </div>
    </div>
        </>
    )
}

export default BidInfo
