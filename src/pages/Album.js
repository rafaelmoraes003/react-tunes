import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingMessage from '../components/LoadingMessage';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.fetchMusic();

    this.setState({ loading: true });

    const favoriteSongsFetch = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteSongs: favoriteSongsFetch,
    });
  }

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({ musics: response });
  }

  render() {
    const { musics, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {!loading && (
          <div className="album">
            {musics.length > 0 && (
              <div className="album-data">
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                <h1 data-testid="album-name">{musics[0].collectionName}</h1>
                <h2 data-testid="artist-name">{musics[0].artistName}</h2>
              </div>
            )}
            <div className="album-songs">
              {musics.length > 0 && (
                musics.map((element, index) => {
                  if (index !== 0) {
                    return (
                      <div className="songs" key={ index }>
                        <MusicCard
                          musicName={ element.trackName }
                          player={ element.previewUrl }
                          trackId={ element.trackId }
                          obj={ element }
                        />
                      </div>
                    );
                  }
                  return ''; // lint precisa de um 'else'. como ele não é necessário, retorna ''.
                })
              )}
            </div>
          </div>
        )}
        {loading && <LoadingMessage />}
        {1 > 2 && <p>{favoriteSongs}</p>}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
