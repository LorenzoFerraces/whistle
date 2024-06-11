import { useContext, useState } from 'react';
import { AuthContext } from '../../../api/AuthContext.jsx';
import {
  FormButton,
  FormSubmitButton,
  SecelectInput,
  SimpleInput,
  ToggleSwitch,
} from '../Form.jsx';

const ProfileEditForm = ({
  userId,
  oldUserInfo,
  setUserInfo,
  close,
}) => {
  const [email, setEmail] = useState(oldUserInfo.email);
  const [preferredSport, setPreferredSport] = useState(oldUserInfo.sport);
  const [location, setLocation] = useState(oldUserInfo.location);
  const [phone, setPhone] = useState(oldUserInfo.phone);
  const [imageURL, setimageURL] = useState(oldUserInfo.imageURL);
  const [showImageInput, setShowImageInput] = useState(false);
  const [username, setUsername] = useState(oldUserInfo.username);
  const { setError, putUserInfo, sports, locations } = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !email ||
      !preferredSport ||
      !location ||
      !phone ||
      !username
    ) {
      setError('Please fill out all fields.');
      return;
    }

    putUserInfo(
      userId,
      email,
      preferredSport,
      location,
      phone,
      imageURL,
      username,
    );
    close();
  };

  const handleImageUrlChange = (url) => {
    checkIfImageExists(url, (isValidUrl) => {
      if (isValidUrl) {
        setimageURL(url);
      } else {
        setError('The image url is invalid, choose another one');
      }
    });
  };

  function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
    }
  }

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="small-section">
            <SimpleInput
                name={'Username *'}
                value={username}
                set={setUsername}
            />
          </div>
        </div>
        <div className="row">
          <div className="small-section">
              <SimpleInput
                  name={'Email *'}
                  value={email}
                  set={setEmail}
              />
          </div>
          <div className="small-section">
              <SimpleInput
                  name={'Phone *'}
                  value={phone}
                  set={setPhone}
              />
          </div>
        </div>
        <div className="row">
          <div className="small-section">
            <SecelectInput
                name={'Province *'}
                list={locations}
                value={location}
                set={setLocation}
            />
          </div>
          <div className="small-section">
            <SecelectInput
                name={'Sport *'}
                list={sports}
                value={preferredSport}
                set={setPreferredSport}
            />
          </div>
        </div>
        <div className="row">
          <div className="button-section">
            <FormButton
                name={'Image'}
                text={'Add Image'}
                onClick={() => setShowImageInput(!showImageInput)}
            />
          </div>
        </div>
        <div className="row">
          {showImageInput ? (
            <SimpleInput
              name={'Image URL'}
              value={imageURL}
              set={handleImageUrlChange}
            />
          ) : null}
        </div>
        <FormSubmitButton text={'Edit'} />
      </form>
    </div>
  );
};

export default ProfileEditForm;
