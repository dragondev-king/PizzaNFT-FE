import React from 'react'
import downArrowImg from "../../assets/images/downarrow.png";

const Size = ({setWidth, width, setHeight, height, setCapacity, capacity}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="dropdown">
                    <div data-toggle="dropdown" className="dropdown-toggle" style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}><label htmlFor="itemsize">size</label><img src={downArrowImg} width="10"/></div>
                    <div className="dropdown-menu" style={{"width": "100%", "padding": "0px"}}>
                        <div className="dropdown-item" style={{"padding": "1px"}}>
                            <div style={{"display": "flex", "alignItems":"center", justifyContent: 'space-between'}}>
                                <div style={{display: "flex", alignItems: "end"}}>
                                    <input className="form-control" type="number" id='size_x'/>
                                    <label htmlFor="itemsize" style={{marginBottom: "0px", marginLeft:'10px'}} value={width} onChange={ (e) => {try{setWidth(e.target.value)} catch(err){}}}>px</label>
                                </div>
                                <div>
                                    <label htmlFor="itemsize" style={{margin:"auto 10px auto 10px"}}>X</label>
                                </div>
                                <div style={{display: "flex", alignItems: "end"}}>
                                    <input className="form-control" type="number" id='size_y'/>
                                    <label htmlFor="itemsize" style={{marginBottom: "0px", marginLeft:'14px', marginRight:'10px'}} value={height} onChange={ (e) => {try{setHeight(e.target.value)} catch(err){}}} >py</label>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown-item" style={{"padding": "1px"}}>
                            <div >
                                <div style={{display: "flex", alignItems: "end"}}>
                                    <input className="form-control" type="number" id='size_x'/>
                                    <label htmlFor="itemsize" style={{marginBottom: "0px", marginLeft:'10px',marginRight:'10px', wordBreak:'false'}} value={capacity} onChange={ (e) => {try{setCapacity(e.target.value)} catch(err){}}}>mg</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Size;
