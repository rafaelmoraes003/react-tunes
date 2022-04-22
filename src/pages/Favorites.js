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
        <h2>Músicas favoritas</h2>
        {loading && <LoadingMessage />}
        {!loading && (
          <div data-testid="page-favorites">
            {musics.map((elemento) => (
              <MusicCard
                key={ elemento.trackId }
                musicName={ elemento.trackName }
                player={ elemento.previewUrl }
                trackId={ elemento.trackId }
                obj={ elemento }
                shouldBeUpdated // TRUE
                update={ this.updateList }
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Favorites;
