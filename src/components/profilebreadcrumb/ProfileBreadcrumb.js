import React from 'react'

const ProfileBreadcrumb = ({name, data}) => {
    return (
        <div className='breadcrumb-container profile'>
            <div className="container">
                <div className="profile-header">
                    <h1>{name}</h1>
                    <div className="profile-social-icons">
                        <a target="_blank" href={data?.email}><i className="fas fa-globe"></i></a>
                        <a target="_blank" href={data?.discord}><i className="fab fa-discord"></i></a>
                        <a target="_blank" href={data?.instagram}><i className="fab fa-instagram-square"></i></a>
                        <a target="_blank" href={data?.twitter}><i className="fab fa-twitter"></i></a>
                        <a target="_blank" href={data?.profileUrl}><i className="fas fa-share-alt"></i></a>
                        <a target="_blank" href={data?.facebook}><i className='fab fa-facebook-square'></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBreadcrumb