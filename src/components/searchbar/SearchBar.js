import React from 'react'

const SearchBar = () => {
    return (
        <div className="search-container">
            <div className="container">
                <div className="form-search-bar">
                    <i className="fas fa-search"></i>
                    <input type="search" id="form1" className="form-control" placeholder="Search by art name, creator or collection" />

                </div>
            </div>
        </div>
    )
}

export default SearchBar
