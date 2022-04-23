import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      user: data,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <LoadingMessage />}
        {!loading && (
          <div className="page-profile">
            <div className="profile-data">
              <img data-testid="profile-image" src={ user.image } alt={ user.name } />
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
              <h3>{user.description}</h3>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
