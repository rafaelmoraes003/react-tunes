import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  async componentDidMount() {
    await this.awaitGetUser();
  }

  awaitGetUser = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();

    this.setState({
      loading: false,
      user: response.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <LoadingMessage />}
        {!loading && (
          <>
            <h2
              data-testid="header-user-name"
            >
              Boas vindas,
              {user}
              !
            </h2>
            <nav>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
