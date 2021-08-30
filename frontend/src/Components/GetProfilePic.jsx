/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React from 'react';
import axios from 'axios';
import RoundedImage from 'react-rounded-image';
import { Button } from 'react-bootstrap';

function GetProfilePic(props) {
  const { user } = props;
  return (
    <div>
      <RoundedImage
        image={`http://localhost:4000/users/${user._id}/avatar`}
        roundedSize="0"
        imageWidth="130"
        imageHeight="130"
      />
    </div>
  );
}

export default GetProfilePic;
