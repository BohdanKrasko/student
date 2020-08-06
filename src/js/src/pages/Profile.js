import React, { useState, useEffect, useCallback} from 'react';
import { getProfiles, uploadUserProfileImage } from '../client';
import { useDropzone } from 'react-dropzone'
const Profiles = () => {

    const [profiles, setProfiles] = useState([]);
    const fetchProfiles = () => {
        getProfiles()
            .then(res => res.json())
            .then(profile => {
                setProfiles(profile)
                console.log(profile)
            })
    } 

    useEffect(() => {fetchProfiles()}, [])

    return profiles.map((profile, index) => {
        return (
            <div key={index}>
                <br/>
                <br/>
                <h1>{profile.username}</h1>
                <h1>{profile.profileId}</h1>
                <Dropzone {...profile}/>
                <br/>
            </div>
        )
    } )
}

function Dropzone({profileId}) {
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      uploadUserProfileImage(profileId, formData).then(res => res.json()).then(p => console.log(p))

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the image here ...</p> :
            <p>Drag 'n' drop some image here, or click to select image</p>
        }
      </div>
    )
  }

const Profile = () => {
    
    return (
        
        <div>
            <Profiles />
        </div>
    )

}

export default Profile;