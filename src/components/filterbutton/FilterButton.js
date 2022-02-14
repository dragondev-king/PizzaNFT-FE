import React from 'react'

const FilterButton = (props) => {
    
    return (
        <>
            <button className={props.active} onClick={ () => props.selectCategory(props.name)}>{props.name}</button>
        </>
    )
}

export default FilterButton
