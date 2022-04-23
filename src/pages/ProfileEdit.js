import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getProfileInfos();
  }

  getProfileInfos = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      loading: false,
      name: data.name,
      email: data.email,
      description: data.description,
      image: data.image,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  shouldBeEnable = () => {
    const { name, email, description, image } = this.state;
    return (
      name.length > 0
      && email.length > 0
      && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      && description.length > 0
      && image.length > 0
    );
  }

  saveProfileChanges = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <LoadingMessage />}
        {!loading && (
          <div className="form-container">
            <form className="profile-edit-form">
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  data-testid="edit-input-image"
                  id="image"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="name">
                Nome
                <input
                  data-testid="edit-input-name"
                  type="text"
                  id="name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                E-mail
                <input
                  data-testid="edit-input-email"
                  type="text"
                  id="email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  id="description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ !this.shouldBeEnable() }
                onClick={ this.saveProfileChanges }
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
