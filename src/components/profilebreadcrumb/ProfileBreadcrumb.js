import React from 'react'

const ProfileBreadcrumb = (props) => {
    return (
        <div className='breadcrumb-container profile'>
            <div className="container">
                <div className="profile-header">
                    <h1>{props.name}</h1>
                    <div className="profile-social-icons">
                        <a href="#"><i className="fas fa-globe"></i></a>
                        <a href="#"><i className="fab fa-discord"></i></a>
                        <a href="#"><i className="fab fa-instagram-square"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fas fa-share-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBreadcrumb