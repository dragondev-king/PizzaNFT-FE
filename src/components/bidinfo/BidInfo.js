import React from 'react'

const BidInfo = (props) => {
  return (
    <>
      <div className="main-bid-container">
        <div className="bid-description bid-info">
          <h6>{props.id}</h6>
          {
            props?.prefix ? (
              <a target="_blank" href={`https://bscscan.com/${props.prefix}/${props.name}`}><h4>{props.name}</h4></a>
            ) : (
              <h4>{props?.name}</h4>
            )
          }

      </div>
    </div>
        </>
    )
}

export default BidInfo
