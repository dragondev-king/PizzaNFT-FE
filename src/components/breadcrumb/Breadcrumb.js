import React from 'react'

const Breadcrumb = (props) => {
    return (
        <div className='breadcrumb-container'>
            <div className="container">
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}

export default Breadcrumb
