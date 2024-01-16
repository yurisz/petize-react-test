import React from 'react';
import { useParams } from 'react-router-dom';


const Profile = () => {

    const { profileId } = useParams();


    return <div>
        Profile {profileId}
    </div>;
};


export default Profile;