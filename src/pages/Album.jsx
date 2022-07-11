import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Footer from '../components/Footer';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicasRelacionadas: [],
    artista: '',
    album: '',
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
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
    const cadaMusica = musicasRelacionadas.map((musica, index) => {
      let listaMusicas = '';
      if (musica.trackName) {
        listaMusicas = (
          <MusicCard
            key = { index }
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
      <div className="md:p-6 lg:p-7 min-h-100vh">
        <p data-testid="artist-name" className="text-white text-center text-2xl py-8 mx-auto w-11/12">
          {`${artista} - ${album} `}
        </p>
        <div className="flex flex-row flex-wrap justify-center">
          { cadaMusica }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="min-h-100vh bg-cover bg-fixed bg-party-2 relative">
        <div className="bg-half-transparent w-full h-full absolute z-10"></div>
        <div className="z-20 relative">
          <Header />
        </div>
        <div className="z-20 relative">
          { this.retornaMusicasRelacionadas() }
        </div>
        <Footer />
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
