import React from "react";

import "./profileImage.css";

const ProfileImage = (props) => {
    const url = (props.profileImage)? ("http://localhost:5000/api/auth/image/" + props.profileImage) : "https://semantic-ui.com/images/wireframe/image.png";
    return(
        <img className="img-fluid" src={url} />
    );
}

export default ProfileImage;