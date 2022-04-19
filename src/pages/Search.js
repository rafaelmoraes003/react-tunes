import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  enableButton = () => {
    const { searchInput } = this.state;
    const MIN = 2;
    if (searchInput.length < MIN) return true;
  }

  render() {
    return (
      <>
        <div data-testid="page-search">Search</div>
        <Header />
        <div>
          <input
            type="text"
            name="searchInput"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ this.enableButton() }
          >
            Procurar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
