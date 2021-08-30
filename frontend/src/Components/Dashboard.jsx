/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProfilePic from './ProfilePic';
import GetProfilePic from './GetProfilePic';

function Dashboard() {
  const [user, setUser] = useState({});
  const history = useHistory();

  const token = localStorage.getItem('authtoken');
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(async () => {
    try {
      const res = await authAxios.get(`/users/me`);
      setUser(res.data);
    } catch (e) {
      alert(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const handleDelete = async () => {
    try {
      const res = await authAxios.delete(`/users/me`);
      localStorage.clear();
      history.push('/');
      alert(`Your profile has been deleted, You're no longer have access to this page.`);
      console.log(res.data);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div>
        <h1 style={{ color: 'darkslateblue' }}>Dashboard</h1>
      </div>
      <Row>
        <Col md={8}>
          <div className="mt-5">
            <h1 style={{ color: 'grey' }}>User info</h1>
            <h3>Name- {user.name}</h3>
            <h3>Email- {user.email}</h3>
            <h4>Id- {user._id}</h4>
          </div>
          <div className="mt-3">
            <Button className="mr-3" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete profile
            </Button>
          </div>
        </Col>
        <Col>
          <div className="mt-3">
            <GetProfilePic user={user} />
          </div>
          <div className="mt-3">
            <ProfilePic />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
