import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from '../components/LoadingMessage';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchInput: '',
      searchAlbum: [],
      artist: '',
      noArtists: true,
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

  fetchAlbums = async () => {
    const { searchInput, searchAlbum } = this.state;

    this.setState({ loading: true, artist: searchInput });

    const response = await searchAlbumsAPI(searchInput);

    this.setState({
      loading: false,
      searchAlbum: response,
      searchInput: '',
    }, () => {
      if (searchAlbum.length < 1) {
        this.setState({ noArtists: false });
      }
    });
  }

  render() {
    const { searchAlbum, searchInput, loading, artist, noArtists } = this.state;
    return (
      <>
        <div data-testid="page-search">Search</div>
        <Header />
        {loading && <LoadingMessage />}
        {!loading && (
          <div className="album-container">

            <input
              type="text"
              name="searchInput"
              value={ searchInput }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />

            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ this.enableButton() }
              onClick={ this.fetchAlbums }
            >
              Procurar
            </button>

            {artist.length > 0 && (
              <p>
                Resultado de álbuns de:
                {artist}
              </p>
            )}

            {!loading && searchAlbum.length > 0 && (
              searchAlbum.map((elemento) => (
                <div className="album-div" key={ elemento.collectionId }>
                  <div>
                    <img
                      src={ elemento.artworkUrl100 }
                      alt={ elemento.collectionName }
                    />
                  </div>
                  <p>{ elemento.artistName }</p>
                  <p>{ elemento.collectionName }</p>
                  <Link
                    to={ `/album/${elemento.collectionId}` }
                    data-testid={ `link-to-album-${elemento.collectionId}` }
                  >
                    Album Page
                  </Link>
                </div>
              ))
            )}

            {!loading && !noArtists && (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Search;
