import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    carregando: false,
    favoritas: [],
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const salvos = await getFavoriteSongs();
    this.setState({
      favoritas: salvos,
      carregando: false,
    });
  }

  verificaSeFavorito = () => {
    const { objetoCompleto } = this.props;
    const { favoritas } = this.state;
    const arrayFav = favoritas.map((music) => {
      if (music.trackName === objetoCompleto.trackName) {
        return true;
      }
      return false;
    });
    if (arrayFav.includes(true)) {
      return true;
    }
    return false;
  }

  adicionaAosFavoritos = async ({ target }) => {
    const { checked } = target;
    const { objetoCompleto } = this.props;
    this.setState({ carregando: true });
    if (checked) {
      await addSong(objetoCompleto);
    } else {
      await removeSong(objetoCompleto);
    }
    const salvos = await getFavoriteSongs();
    this.setState({
      favoritas: salvos,
      carregando: false,
    });
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      artworkUrl100,
      atualizaFavoritos,
      type,
    } = this.props;
    const { carregando } = this.state;
    if (carregando === true) {
      return (
        <div className="div-musicas-carregando">
          <div>
            Carregando...
          </div>
          <div id="icone-carregando">
            <div className="icone-loading"> </div>
            <div className="icone-loading"> </div>
            <div className="icone-loading"> </div>
          </div>
        </div>);
    }
    return (
      <div className="div-musicas">
        <div className="div-musicas-description">
          <audio
            className="arquivo-de-audio"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <p>{ trackName }</p>
          <label htmlFor={ trackId }>
            <input
              checked={ this.verificaSeFavorito() }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              onChange={
                type === 'pesquisa'
                  ? this.adicionaAosFavoritos
                  : atualizaFavoritos
              }
            />
            Favorita
          </label>
        </div>
        <div className="div-musicas-image">
          <img src={ artworkUrl100 } alt={ `arte do album da musica ${trackName}` } />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  objetoCompleto: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  atualizaFavoritos: PropTypes.func.isRequired,
};

export default MusicCard;
