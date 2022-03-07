import React, { useState } from 'react'
// import Checkbox from 'react-checkbox-component'
import downArrowImg from "../../assets/images/downarrow.png"

const VerifiedArtist = ({setVerified, verified}) => {

    const handler = () => { 
        setVerified(!verified);
    }
  
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="dropdown">
                    <div data-toggle="dropdown" className="dropdown-toggle" style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}><label htmlFor="itemsize">Verified Artist</label><img src={downArrowImg} width="10"/></div>
                    <div className="dropdown-menu verify_checkbox" style={{"width": "100%", "padding": "0px"}}>
                        <div className="dropdown-item" style={{"padding": "1px", 'display':'flex', 'alignItems':'center'}}>
                            {/* <Checkbox size="medium" onChange={ handler } isChecked={verified}/> Verified */}
                        </div>

                        <div className="dropdown-item" style={{"padding": "1px", 'display': 'flex', 'alignItems':'center'}}>
                            {/* <Checkbox size="medium" onChange={ handler } isChecked={!verified}/> Not Verified */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifiedArtist;
