/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function ProfilePic() {
  const [selectedFile, setSelectedFile] = useState({ selectedFile: null });
  const [isSelected, setIsSelected] = useState(false);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem('authtoken');
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    setShow(false);
  };

  const deleteHandler = async () => {
    try {
      const res = await authAxios.delete(`/users/me/avatar`);
      console.log(res);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (e) {
      alert(e);
    }
  };

  const fileUpload = async () => {
    if (isSelected) {
      const fd = new FormData();
      fd.append('avatar', selectedFile, selectedFile.name);
      try {
        const res = await authAxios.post('/users/me/avatar', fd);
        console.log(res);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      } catch (e) {
        alert(e);
      }
    } else {
      setShow(true);
    }
    return null;
  };
  return (
    <div>
      <Form.Group>
        <Form.File size="sm" className="mb-2" onChange={fileHandler} label="Change profile pic" />
        <Button className="mr-2" size="sm" onClick={fileUpload}>
          Set
        </Button>
        <Button size="sm" variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
        <Alert className="mt-2" size="sm" show={show} variant="danger">
          Please select a file
        </Alert>
      </Form.Group>
    </div>
  );
}

export default ProfilePic;
