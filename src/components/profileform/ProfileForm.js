import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UploadImage from '../../assets/images/plus.png'

const ProfileForm = () => {
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const [profileImg, setProfileImg] = useState();
    const [name, setName] = useState();
    const [profileUrl, setProfileUrl] = useState();

    const handleChange = (e) => {
        const [file] = e.target.files;
        setProfileImg(file);
        setProfileImgUrl(URL.createObjectURL(file));
    };

    useEffect( ()=> {
        axios.get(`http://localhost:8080/api/profile/${localStorage.getItem('account')}`)
        .then( res => {
            console.log(res);
            if(res.error) return

            setProfileImgUrl(res.data[0].profileImg);
            setName(res.data[0].name);
            setProfileUrl(res.data[0].profileUrl);
        })
    }, [])

    const update = (e)=> {
        e.preventDefault();
        if(localStorage.getItem("connectStatus") === "connected") {
            const formData = new FormData();
            formData.append('profileImg', profileImg);
            formData.append("name", name);
            formData.append("profileUrl", profileUrl);

            axios.put(`http://localhost:8080/api/profile/${localStorage.getItem('account')}`, formData, {'Accept':'multipart/form-data'})
            .then(res => {
        console.log("ok_  ",res)

                if(res.status == 200) {
                    alert("Success!");
                } else {
                    alert("Failed!");
                }
            })
        } else {
            alert("please MetaMask connect!");
        }
    }

    return (
        <>
            <div className='picture-lable'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="fileupload">Upload Profile Picture</label>
                            <div className="picture-container">
                                <div className="picture">
                                    <img src={profileImgUrl === "" ? UploadImage : profileImgUrl} className="picture-src" id="wizardPicturePreview" title="" />
                                    <input type="file" id="wizard-picture" className="" onChange={handleChange} />
                                </div>
                                <h6 className="">Choose Picture</h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="itemname">Display name</label>
                            <input className="form-control" type="text" id='displayname' onChange={ (e)=> setName(e.target.value)} value={name} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="itemname">Custom URL</label>
                            <input className="form-control" type="text" id='displayname' onChange={ (e)=> setProfileUrl(e.target.value)} value={profileUrl}/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-default" onClick={ update }>Update Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileForm
