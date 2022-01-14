import React from 'react'

const MainImage = ({nftImg}) => {
    return (
        <>
            <img src={nftImg} alt="" className="img-responsive" style={{width: '100%', height: '100%'}} />
        </>
    )
}

export default MainImage
