import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from '../../graphql/mutations';
import { onSelectUserFile } from '../../util/image_util';
const { UPLOAD_USER_IMAGE } = Mutations;

const UserImage = props => {
  const { image, userId } = props;
  const [uploadImage] = useMutation(UPLOAD_USER_IMAGE);
  let fileInput;

  const reveal = () => {
    const half = document.getElementById('user-profile-avatar-half');
    half.style.visibility = "visible";
  };
  const hide = () => {
    const half = document.getElementById('user-profile-avatar-half');
    half.style.visibility = "hidden";
  };

  return (
    <div className="user-profile-image-container">
      <div
        onClick={() => fileInput.click()}
        onMouseEnter={() => reveal()}
        onMouseLeave={() => hide()}
        className='user-profile-info-avatar'
        style={ { backgroundImage: `url(${image})` } }
        >
          <div id="user-profile-avatar-half">
            <i className="fas fa-camera" />
            <span>Upload</span>
          </div>
      </div>
      <input
        onChange={e => {
          onSelectUserFile(e, uploadImage, userId);
        }}
        id="image-file-input"
        type="file"
        accept="image/*"
        ref={node => { fileInput = node }}
      />
    </div>
  )
};

export default UserImage;