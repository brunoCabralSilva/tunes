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
        <div className="bg-black m-2 w-11/12 sm:w-45% md:w-30% lg:w-23% text-white text-xl rounded flex flex-row justify-around items-center pr-4">
        Carregando...
        <div className="relative w-20 h-20 z-20 flex flex-row items-center justify-center mt-3">
          <div className="loading w-3 h-3 bg-white rounded-full absolute"> </div>
          <div className="loading w-3 h-3 bg-white rounded-full absolute"> </div>
          <div className="loading w-3 h-3 bg-white rounded-full absolute"> </div>
        </div>
      </div>);
    }
    return (
      <div className="bg-black m-2 w-11/12 sm:w-45% md:w-30% lg:w-23% text-white rounded flex flex-row-reverse justify-between">
        <div className="div-musicas-description flex flex-col-reverse w-3/5 align-between justify-between">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            className="w-full p-2"
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId } className="pb-1 px-2">
            <input
            className="mr-1" 
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
          <p className="p-2">{ trackName }</p>
        </div>
          <img src={ artworkUrl100 } alt={ `arte do album da musica ${trackName}` } className="h-full w-2/5 object-cover rounded pl-2 py-2" />
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
