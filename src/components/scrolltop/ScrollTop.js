import React, { useState } from 'react'

const ScrollTop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (

        <div className="scrolltop-div" onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }} >
            <i className="fas fa-arrow-up"></i>
        </div>
    )
}

export default ScrollTop
