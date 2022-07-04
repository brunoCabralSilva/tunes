import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import logo from '../images/trybe.png';

class Album extends React.Component {
  state = {
    musicasRelacionadas: [],
    artista: '',
    album: '',
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const resultado = await getMusics(id);
    this.setState({
      musicasRelacionadas: resultado,
      artista: resultado[0].artistName,
      album: resultado[0].collectionName,
    });
  }

  retornaMusicasRelacionadas = () => {
    const { musicasRelacionadas, artista, album } = this.state;
    const cadaMusica = musicasRelacionadas.map((musica) => {
      let listaMusicas = '';
      if (musica.trackName) {
        listaMusicas = (
          <MusicCard
            type="pesquisa"
            objetoCompleto={ musica }
            previewUrl={ musica.previewUrl }
            trackName={ musica.trackName }
            trackId={ musica.trackId }
            artworkUrl100={ musica.artworkUrl100 }
          />);
      }
      return listaMusicas;
    });
    return (
      <div>
        <p data-testid="artist-name" className="result">
          { artista }
        </p>
        <p data-testid="album-name" className="result">
          { album }
        </p>
        <div className="todas-as-musicas">
          { cadaMusica }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div data-testid="page-album">
        <div className="barra-superior">
          <img src={ logo } alt={ logo } className="trybe-barra-superior" />
          <nav className="navigate">
            <Header />
            <Usuario />
          </nav>
        </div>
        { this.retornaMusicasRelacionadas() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
