import React from 'react';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import logo from '../images/trybe.png';

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
      <div data-testid="page-favorites" className="h-screen bg-cover bg-fixed bg-party-3 relative">
        <div className="w-full h-full bg-half-transparent justify-center items-center absolute z-10"></div>
        <Header />
        <div className="">
          { this.retornaExibicao() }
        </div>
      </div>

    );
  }
}

export default Favorites;
