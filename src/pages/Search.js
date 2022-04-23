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
      if (searchAlbum.length === 0) {
        this.setState({ noArtists: false });
      }
    });
  }

  render() {
    const { searchAlbum, searchInput, loading, artist, noArtists } = this.state;
    return (
      <>
        <div data-testid="page-search" />
        <Header />
        {loading && <LoadingMessage />}
        {!loading && (
          <div className="album-container">

            <div className="search-div">
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
            </div>

            {artist.length > 0 && searchAlbum.length > 0 && (
              <p>{`Resultado de álbuns de: ${artist}`}</p>
            )}

            <div className="cards-container">
              {!loading && searchAlbum.length > 0 && (
                searchAlbum.map((elemento) => (
                  <div className="album-div" key={ elemento.collectionId }>
                    <img
                      src={ elemento.artworkUrl100 }
                      alt={ elemento.collectionName }
                    />
                    <h2>{ elemento.artistName }</h2>
                    <p>{ elemento.collectionName }</p>
                    <Link
                      to={ `/album/${elemento.collectionId}` }
                      data-testid={ `link-to-album-${elemento.collectionId}` }
                    >
                      Ir para o álbum
                    </Link>
                  </div>
                ))
              )}
            </div>

            {!loading && searchAlbum.length < 1 && !noArtists && (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Search;
