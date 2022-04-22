import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: this.shouldBeChecked(),
    };
  }

  shouldBeChecked = () => {
    const { trackId } = this.props;
    const array = localStorage.getItem('favorite_songs');
    return array.includes(trackId);
  }

  handleChange = () => {
    const { check } = this.state;
    if (check === false) {
      this.setState({ check: true });
    } else {
      this.setState({ check: false });
    }
  }

  awaitAddFavorite = async () => {
    const { check } = this.state;
    const { obj, update, shouldBeUpdated } = this.props;

    if (check === true) {
      this.setState({ loading: true });
      await removeSong(obj); // REMOVE A MÚSICA
      if (shouldBeUpdated) {
        const data = await getFavoriteSongs();
        update(data);
      }
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await addSong(obj); // ADICIONA A MÚSICA
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { musicName, player, trackId } = this.props;
    const { loading, check } = this.state;
    return (
      <>
        {!loading && (
          <div>

            <h2>{musicName}</h2>

            <audio data-testid="audio-component" src={ player } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>

            <label htmlFor={ musicName }>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ musicName }
                onClick={ this.awaitAddFavorite }
                onChange={ this.handleChange }
                checked={ check }
              />
              Favorita
            </label>

          </div>
        )}
        {loading && <LoadingMessage />}
      </>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  obj: PropTypes.objectOf(PropTypes.shape()).isRequired,
  update: PropTypes.func.isRequired,
  shouldBeUpdated: PropTypes.bool.isRequired,
};

export default MusicCard;
