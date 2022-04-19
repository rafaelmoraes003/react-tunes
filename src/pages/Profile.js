import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <div data-testid="page-profile">Profile</div>
        <Header />
      </>
    );
  }
}

export default Profile;
