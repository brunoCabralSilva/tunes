import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import Footer from '../components/Footer';

class Favorites extends React.Component {
  state = {
    carregando: false,
    listaDeFavoritos: [],
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const favoritos = await getFavoriteSongs();
    this.setState({
      listaDeFavoritos: favoritos,
      carregando: false,
    });
  }

  atualizaFavoritos = async ({ target }) => {
    this.setState({ carregando: true });
    const { listaDeFavoritos } = this.state;
    const favoritoExcluido = listaDeFavoritos.find((fav) => {
      const valor = fav.trackId === parseInt(target.id, 10);
      return valor;
    });
    await removeSong(favoritoExcluido);
    const favoritos = await getFavoriteSongs();
    this.setState({
      listaDeFavoritos: favoritos,
      carregando: false,
    });
  }

  retornaExibicao = () => {
    const { listaDeFavoritos, carregando } = this.state;
    if (carregando === true) {
      return (<Carregando />);
    }
    const cadaFavorito = listaDeFavoritos.map((favorito) => {
      const musica = (
        <MusicCard
          type="favoritos"
          objetoCompleto={ favorito }
          previewUrl={ favorito.previewUrl }
          trackName={ favorito.trackName }
          trackId={ favorito.trackId }
          artworkUrl100={ favorito.artworkUrl100 }
          atualizaFavoritos={ this.atualizaFavoritos }
        />
      );
      return musica;
    });
    return cadaFavorito;
  }

  render() {
    return (
      <div data-testid="page-favorites" className="min-h-100vh bg-cover bg-fixed bg-party-3 relative">
        <div className="w-full h-full bg-half-transparent justify-center items-center absolute z-10"></div>
        <Header />
          <div className="md:p-6 lg:p-7 min-h-100vh">
          <p data-testid="artist-name" className="text-white text-center text-2xl py-6 z-20 relative">
            Favoritos
          </p>
          <div className="flex flex-row flex-wrap justify-center">
            { this.retornaExibicao() }
          </div>
        </div>
          <Footer />
      </div>

    );
  }
}

export default Favorites;
