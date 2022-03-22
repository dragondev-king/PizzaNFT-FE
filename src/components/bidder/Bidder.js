import React from 'react'
import dateFormat from "dateformat"
import AvatarImages from '../../assets/images/artist-avatar.jpg'
import { getUTCTime } from '../../utils/helpers'

const Bidder = ({item}) => {
    let date = getUTCTime(item.createdAt)
    return (
        <>
            <div className="main-bid-container">
                <div className="bid-avatar-image">
                    <div className="avatarimage">
                        <img src={item.bidder_info[0]?.profileImg ? item.bidder_info[0]?.profileImg : AvatarImages} alt="" style={{'width':'100px', 'maxHeight':'100px'}}/>
                    </div>
                </div>
                <div className="bid-description">
                    <h4>{item.bidder}</h4>
                    <h5>Bid <span>{item.amount} BNB</span></h5>
                    <h6>{ dateFormat(date, "d  mmm  hh:MM:ss tt") }</h6>
                </div>
            </div>
        </>
    )
}

export default Bidder
