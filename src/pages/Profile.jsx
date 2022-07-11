import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import logo from '../images/trybe.png';

class Profile extends React.Component {
  state = {
    dadosUsuario: '',
    carregando: false,
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const perfil = await getUser();
    this.setState({
      dadosUsuario: perfil,
      carregando: false,
    });
  }

  return = () => {
    const { history } = this.props;
    history.push("/profile/edit");
  }

  retornaDadosUsuario = () => {
    const { dadosUsuario, carregando } = this.state;
    if (carregando === true) {
      return <Carregando />;
    }
    console.log(dadosUsuario);
    const perfil = (
      <div className="flex justify-center h-80p items-center text-dark">
        <div className="w-60 bg-light z-20 rounded-xl flex flex-col justify-center px-5 pt-5">
          <img
            src={ dadosUsuario.image }
            data-testid="profile-image"
            alt="imagem de perfil"
            className="rounded-t-lg"
          />
        <div className="flex flex-col">
          <p className="w-full text-center pt-3 pb-2"><strong>Perfil</strong></p>
          <div className="flex-col flex">
            <div className="flex flex-row">
              <div>
                <strong className="pr-1">Nome:</strong>
                <span className="break-all">{ dadosUsuario.name }</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>
            <strong className="pr-1">E-mail:</strong>
            </div>
            <div className="break-all">
              { dadosUsuario.email }
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div>
            <strong className="pr-1">Descrição:</strong>
              <span className="break-all">{ dadosUsuario.description }</span>
            </div>
          </div>
            '<button onClick={ this.return } className="w-full bg-dark text-white p-3">
              Editar perfil
            </button>'
          </div>
        </div>
      </div>
    );
    return perfil;
  }

  render() {
    return (
      <div data-testid="page-profile" className="h-screen bg-cover bg-fixed bg-party-4 relative">        
      <div className="w-full h-full bg-half-transparent justify-center items-center absolute z-10" />
          <Header />
        { this.retornaDadosUsuario() }
      </div>
    );
  }
}

export default Profile;
