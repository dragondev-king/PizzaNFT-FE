import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import UploadImage from '../../assets/images/plus.png'
import { Common } from '../../redux/common'
import { updateUserInfo } from '../../redux/actions'
import { showNotification } from '../../utils/helpers';
import { FileUploader } from "react-drag-drop-files"
import { profileImageTypes } from '../../config/constants'

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { profileImg, name, profileUrl, account, coverImg, email, facebook, bio, instagram, discord, twitter } = Common();
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("")
  const [updateName, setUpdateName] = useState("");
  const [updateProfileImg, setUpdateProfileImg] = useState("");
  const [updateCoverImg, setUpdateCoverImg] = useState("")
  const [updateProfileUrl, setUpdateProfileUrl] = useState("");
  const [updateEmail, setUpdateEmail] = useState("")
  const [updateFacebook, setUpdateFacebook] = useState("")
  const [updateBio, setUpdateBio] = useState("")
  const [updateInstagram, setUpdateInstagram] = useState("")
  const [updateDiscord, setUpdateDiscord] = useState("")
  const [updateTwitter, setUpdateTwitter] = useState("")

  useEffect(() => {
    if (!account) {
      setProfileImgUrl("");
      setUpdateName("");
      setUpdateProfileUrl("");
    } else {
      setUpdateProfileImg(profileImg ? profileImg : "")
      setUpdateCoverImg(coverImg ? coverImg : "")
      setProfileImgUrl(profileImg ? profileImg : "");
      setCoverImgUrl(coverImg ? coverImg : "")
      setUpdateName(name ? name : "");
      setUpdateProfileUrl(profileUrl ? profileUrl : "");
      setUpdateEmail(email ? email : "")
      setUpdateFacebook(facebook ? facebook : "")
      setUpdateBio(bio ? bio : "")
      setUpdateInstagram(instagram ? instagram : "")
      setUpdateDiscord(discord ? discord : "")
      setUpdateTwitter(twitter ? twitter : "")
    }
  }, [profileImg, name, profileUrl, account, coverImg, email, facebook, bio, instagram, discord, twitter])

  const handleProfileChange = (file) => {
    setUpdateProfileImg(file);
    setProfileImgUrl(URL.createObjectURL(file));
  };

  const handleCoverChange = (file) => {
    setUpdateCoverImg(file)
    setCoverImgUrl(URL.createObjectURL(file))
  }

  const handleError = (err) => {
    showNotification({
      title: "Warning",
      message: 'File types should be .jpeg/jpg or .png',
      type: "danger",
      insert: "top",
      container: "top-right",
    });
  }

  const update = (e) => {
    e.preventDefault();
    if (account) {
      dispatch(updateUserInfo(account, updateName, updateProfileImg, updateProfileUrl, updateCoverImg, updateEmail, updateFacebook, updateBio, updateInstagram, updateDiscord, updateTwitter))
      window.location.reload(false)
    } else {
      showNotification({
        title: 'Warning',
        message: 'Please connect MetaMask',
        type: 'danger',
        insert: 'top',
        container: 'top-right'
      })
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
                  <div className='file-uploader-wrapper'>
                    <FileUploader
                      handleChange={handleProfileChange}
                      classes="file-uploader"
                      name="file"
                      multiple={false}
                      label="Upload or drop a file right here"
                      types={profileImageTypes}
                      onTypeError={handleError}
                    />
                  </div>
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
                  <img src={coverImgUrl === "" ? UploadImage : coverImgUrl} className="picture-src" id="wizardPicturePreview-new" title="" />
                  <div className='file-uploader-wrapper'>
                    <FileUploader
                      handleChange={handleCoverChange}
                      classes='file-uploader'
                      name="file"
                      multiple={false}
                      label="Upload or drop a file right here"
                      types={profileImageTypes}
                      onTypeError={handleError}
                    />
                  </div>
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
              <input className="form-control" type="text" id='email' onChange={(e) => setUpdateEmail(e.target.value)} value={updateEmail} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="itemname">Facebook</label>
              <input className="form-control" type="text" id='facebook' onChange={(e) => setUpdateFacebook(e.target.value)} value={updateFacebook} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="itemname">Instagram</label>
              <input className="form-control" type="text" id='instagram' onChange={(e) => setUpdateInstagram(e.target.value)} value={updateInstagram} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="itemname">Discord</label>
              <input className="form-control" type="text" id='discord' onChange={(e) => setUpdateDiscord(e.target.value)} value={updateDiscord} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="itemname">Twitter</label>
              <input className="form-control" type="text" id='twitter' onChange={(e) => setUpdateTwitter(e.target.value)} value={updateTwitter} />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="itemname">Bio</label>
              <textarea style={{ height: '100px' }} className="form-control" type="text" id='bio' onChange={(e) => setUpdateBio(e.target.value)} value={updateBio} />
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
