import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import UploadImage from '../../assets/images/plus.png'
import { Common } from '../../redux/common'
import { updateUserInfo, updateUserInfoNoImg } from '../../redux/actions'

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { profileImg, name, profileUrl, account } = Common();
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateProfileImg, setUpdateProfileImg] = useState("");
    const [updateProfileUrl, setUpdateProfileUrl] = useState("");

    useEffect(() => {
        if (!account) {
            setProfileImgUrl("");
            setUpdateName("");
            setUpdateProfileUrl("");
        } else {
            setProfileImgUrl(profileImg ? profileImg : "");
            setUpdateName(name ? name : "");
            setUpdateProfileUrl(profileUrl ? profileUrl : "");
        }
    }, [profileImg, name, profileUrl, account])

    const handleChange = (e) => {
        const [file] = e.target.files;
        setUpdateProfileImg(file);
        setProfileImgUrl(URL.createObjectURL(file));
    };

    const update = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if(account) {
            if( updateProfileImg === "") {
                dispatch( updateUserInfoNoImg( account, updateName, updateProfileUrl) )
            } else {
                dispatch( updateUserInfo( account, updateName, updateProfileImg, updateProfileUrl) )
            }
=======
        if (account) {
            dispatch(updateUserInfo(account, updateName, updateProfileImg, updateProfileUrl))
>>>>>>> 2300e79 (Profile Edits)
        } else {
            alert("please MetaMask connect!");
        }
    }

    return (
        <>
            <div className='picture-lable'>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="fileupload">Upload Profile Picture</label>
                            <div className="picture-container">
                                <div className="picture">
                                    <img src={profileImgUrl === "" ? UploadImage : profileImgUrl} className="picture-src" id="wizardPicturePreview" title="" />
                                    <input type="file" id="wizard-picture" className="" onChange={handleChange} />
                                </div>
                                <h6 className="">Choose Picture</h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="form-group">
                            <label htmlFor="fileuploadnew" className='cover fileuploadlabel'>Upload Cover Photo</label>
                            <div className="picture-container">
                                <div className="picture cover-image">
                                    <img src={profileImgUrl === "" ? UploadImage : profileImgUrl} className="picture-src" id="wizardPicturePreview-new" title="" />
                                    <input type="file" id="wizard-picture-new" className="" onChange={handleChange} />
                                </div>
                                <h6 className="">Choose Picture</h6>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="itemname">Display name</label>
                            <input className="form-control" type="text" id='displayname' onChange={(e) => setUpdateName(e.target.value)} value={updateName} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="itemname">Custom URL</label>
                            <input className="form-control" type="text" id='displayname' onChange={(e) => setUpdateProfileUrl(e.target.value)} value={updateProfileUrl} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="itemname">Email</label>
                            <input className="form-control" type="text" id='email' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="itemname">Facebook</label>
                            <input className="form-control" type="text" id='facebook' />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-default" onClick={update}>Update Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileForm
