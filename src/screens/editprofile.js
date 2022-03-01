import React from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProfileForm from '../components/profileform/ProfileForm'

const Editprofile = () => {

    return (
        <>
            <Breadcrumb name="Edit Profile" />
            <div className="starparalax create">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="title">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="create-form-container">
                                    <ProfileForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editprofile
