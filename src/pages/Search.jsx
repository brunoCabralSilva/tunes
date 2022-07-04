import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import logo from '../images/trybe.png';

class Search extends React.Component {
  state= {
    habilitaBtnPesquisa: true,
    pesquisa: '',
    pesquisaSalva: '',
    busca: [],
    vazio: false,
    carregando: false,
  }

  mudaEstiloBotao = () => {
    const { habilitaBtnPesquisa } = this.state;
    const classeBotao = habilitaBtnPesquisa ? 'btn-disabled-search' : 'btn-search';
    return classeBotao;
  }

  verificaTamanho = ({ target }) => {
    const { value } = target;
    const minimo = 2;
    this.setState({ pesquisa: value });
    if (value.length >= minimo) {
      this.setState({ habilitaBtnPesquisa: false });
    } else {
      this.setState({ habilitaBtnPesquisa: true });
    }
  }

  realizaBusca = async () => {
    const { pesquisa } = this.state;
    this.setState({
      pesquisaSalva: pesquisa,
      carregando: true,
    });
    const objetoBusca = await searchAlbumsAPI(pesquisa);
    this.setState({
      busca: objetoBusca,
      pesquisa: '',
      vazio: false,
      carregando: false,
    });
    if (objetoBusca.length === 0) {
      this.setState({ vazio: true });
    }
  }

  retornaResumido = (collectionName, number) => {
    if (collectionName.length > number) {
      let nomeReduzido = '';
      for (let i = 0; i < number - 1; i += 1) {
        nomeReduzido += collectionName[i];
      }
      nomeReduzido += '...';
      return nomeReduzido;
    } return collectionName;
  }

  dadosEncontrados = () => {
    const { busca, pesquisaSalva } = this.state;
    if (busca.length === 0) return (<div className=""> </div>);
    const cadaDadoEncontrado = busca.map((dado) => {
      const {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
        trackCount,
      } = dado;
      // const limiteArtista = 10;
      // const limiteAlbum = 20;
      return (
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
          className=""
          key={ collectionId }
        >
          <div className="">
            <img
              src={ artworkUrl100 }
              alt={ `arte do album ${collectionName}` }
              className=""
            />
          </div>
          <div>
            <span className="">
              { trackCount }
              {' - '}
              { collectionName }
            </span>
            <br />
            <span className="">
              { artistName }
            </span>
          </div>
        </Link>
      );
    });
    return (
      <div className="">
        <p className="">
          {`Resultado de álbuns de: ${pesquisaSalva}` }
        </p>
        <div className="">
          { cadaDadoEncontrado }
        </div>
      </div>
    );
  }

  retornaInputOuCarregando = () => {
    const { habilitaBtnPesquisa, pesquisa, carregando } = this.state;
    if (carregando === true) return (<Carregando />);
    return (
      <div>
        <div className="">
          <img src={ logo } alt={ logo } className="" />
          <nav className="">
            <Header />
            <Usuario />
          </nav>
        </div>
        <div data-testid="page-login" className="">
          <input
            type="text"
            data-testid=""
            value={ pesquisa }
            name="pesquisa"
            className=""
            placeholder="Digite o nome da banda ou artista"
            onChange={ this.verificaTamanho }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ habilitaBtnPesquisa }
            className={ this.mudaEstiloBotao() }
            onClick={ this.realizaBusca }
          >
            <strong>
              Pesquisar
            </strong>
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { vazio, carregando } = this.state;
    const frase = 'Nenhum álbum foi encontrado';
    if (carregando === true) return (<Carregando />);
    return (
      <div data-testid="page-search" className="bg-black">
        { this.retornaInputOuCarregando() }
        { vazio === true
          ? <p className="">{ frase }</p>
          : this.dadosEncontrados() }
      </div>

    );
  }
}

export default Search;
