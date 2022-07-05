import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import logo from '../images/trybe-dark.png';

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
    const classeBotao = habilitaBtnPesquisa ? 'bg-light text-dark border-dark' : 'border-white bg-dark text-white';
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
      return (
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
          className="w-32 p-2 z-20 bg-dark hover:border hover-border-white m-1 text-white rounded"
          key={ collectionId }
        >
          <div className="flex flex-col justify-center">
            <img
              src={ artworkUrl100 }
              alt={ `arte do album ${this.retornaResumido(collectionName, 20)}` }
              className="h-28"
            />
          </div>
          <div>
            <span className="">
              { trackCount }
              {' - '}
              { this.retornaResumido(collectionName, 7) }
            </span>
            <br />
            <span className="">
              { this.retornaResumido(artistName, 10) }
            </span>
          </div>
        </Link>
      );
    });
    return (
      <div className="">
        <p className="text-2xl sm:text-4xl z-20 w-full pl-5 sm:pl-16 sm:text-left text-white relative mb-3 z-20 sublinhado font-bold">
          {`Resultado de álbuns de: ${pesquisaSalva}` }
        </p>
        <div className="flex flex-row flex-wrap justify-center w-full z-20">
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
        <nav className="flex flex-col items-center relative min-h-10p z-20">
          <div className="flex flex-row justify-between w-full mt-3 sm:mt-1 z-20">
            <div className='w-56'>
            <img src={ logo } alt={ logo } className="sm:w-14 w-10 pl-4 object-contain" />
            </div>
            <Header classe="hidden sm:flex" />
            <div className='w-56'>
            <Usuario />
            </div>
          </div>
          <Header classe="sm:hidden flex p-4 z-20" />
        </nav>
        <div data-testid="page-login" className="flex flex-col items-center justify-center min-h-30vh sm:min-h-30vh mt-5">
          <div className="lg:w-2/5 h-30p drop-shadow-xl rounded flex flex-col justify-around items-center relative z-10 rounded-l">
            <input
              type="text"
              data-testid=""
              value={ pesquisa }
              name="pesquisa"
              className="bg-white border-2 border-dark rounded-full border-bottom px-4 py-3 w-full text-center text-black"
              placeholder="Digite o nome da banda ou artista"
              onChange={ this.verificaTamanho }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ habilitaBtnPesquisa }
              className={`${this.mudaEstiloBotao()} border-2 mt-3 px-4 py-3 mb-5 rounded-full transition w-full duration-1000` }
              onClick={ this.realizaBusca }
            >
              <strong>
                Pesquisar
              </strong>
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { vazio, carregando } = this.state;
    const frase = 'Nenhum álbum foi encontrado';
    if (carregando === true) return (<Carregando />);
    return (
      <div data-testid="page-search" className="relative min-h-100vh bg-party bg-no-repeat bg-cover bg-center bg-fixed">
        {/* <div className="absolute w-full h-full bg-half-transparent justify-center items-center absolute z-10"></div> */}
        { this.retornaInputOuCarregando() }
        { vazio === true
          ? <p className="text-4xl z-20 w-full text-center sm:pl-11 sm:text-left">{ frase }</p>
          : this.dadosEncontrados() }
      </div>

    );
  }
}

export default Search;
