import React from 'react'
import { useDispatch } from "react-redux"

const SearchBar = () => {
    const dispatch = useDispatch();

    const searchAction = (text) => {
        dispatch( { 
            type: "SEARCH_TEXT",
            payload: {searchText: text}
        })
    }

    return (
        <div className="search-container">
            <div className="container" style={{paddingLeft: "0px"}}>
                <div className="form-search-bar">
                    <i className="fas fa-search"></i>
                    <input type="search" id="form1" className="form-control" placeholder="Search by art name, creator or collection" onChange={ (e) => searchAction(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
