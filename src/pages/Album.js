import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({ musics: response });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0 && (
          <>
            <h1 data-testid="album-name">{musics[0].collectionName}</h1>
            <h2 data-testid="artist-name">{musics[0].artistName}</h2>
          </>
        )}
        {musics.length > 0 && (
          musics.map((element, index) => {
            if (index !== 0) {
              return (
                <div key={ element.artistId }>
                  <MusicCard
                    musicName={ element.trackName }
                    player={ element.previewUrl }
                  />
                </div>
              );
            }
            return '';
          })
        )}
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
