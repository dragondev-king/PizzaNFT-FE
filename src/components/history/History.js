import React from 'react'
import dateFormat from "dateformat"
import AvatarImage from '../avatarimage/AvatarImage'
import AvatarImages from '../../assets/images/artist-avatar.jpg'

const History = ({item}) => {
    let date = new Date(item.createdAt)
    return (
        <>
            <div className="main-bid-container">
                <div className="bid-avatar-image">
                    {/* <AvatarImage /> */}
                    <div className="avatarimage">
                        <img src={item.history_info[0]?.profileImg ? item.history_info[0]?.profileImg : AvatarImages} alt="" style={{'width':'100px', 'maxHeight':'100px'}}/>
                    </div>
                </div>
                <div className="bid-description">
                    <h5 style={{marginTop: '0'}}>{ item.history_info[0]?.name }</h5>
                    <h5>{ item?.event }</h5>
                    <h6>{ dateFormat(date, "d  mmm  hh:MM:ss tt") }</h6>
                </div>
            </div>
        </>
    )
}

export default History
