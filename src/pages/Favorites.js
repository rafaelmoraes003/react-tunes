import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.renderFavoriteMusics();
  }

  renderFavoriteMusics = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({
      musics: response,
      loading: false,
    });
  }

  updateList = (value) => {
    this.setState({
      musics: value,
    });
  }

  render() {
    const { loading, musics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="page-favorites">
          <h2>Músicas favoritas</h2>
          {loading && <LoadingMessage />}
          {!loading && (
            <div className="fav-songs">
              {musics.map((elemento) => (
                <MusicCard
                  key={ elemento.trackId }
                  musicName={ elemento.trackName }
                  player={ elemento.previewUrl }
                  trackId={ elemento.trackId }
                  obj={ elemento }
                  shouldBeUpdated // TRUE
                  shouldLoadImage={ elemento.artworkUrl100 } // TRUE
                  update={ this.updateList }
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Favorites;
