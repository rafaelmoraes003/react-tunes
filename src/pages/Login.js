import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';
import logo from '../images/logo.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  enableButton = () => {
    const { loginInput } = this.state;
    const MIN = 3;
    if (loginInput.length < MIN) return true;
  }

  awaitUser = async () => {
    const { loginInput } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: loginInput });

    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        {loading && <LoadingMessage />}
        {!loading
          && (
            <div className="login-container" data-testid="page-login">
              <div className="img-div">
                <img src={ logo } alt="Logo Trybetunes" />
              </div>
              <form>
                <input
                  type="text"
                  placeholder="Username"
                  data-testid="login-name-input"
                  name="loginInput"
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ this.enableButton() }
                  onClick={ this.awaitUser }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default Login;
