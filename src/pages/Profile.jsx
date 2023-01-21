import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import Footer from '../components/Footer';

class Profile extends React.Component {
  state = {
    dadosUsuario: '',
    carregando: false,
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
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
      <div className="flex justify-center  min-h-100vh items-center text-dark">
        <div className="w-80 bg-light z-20 rounded-xl flex flex-col justify-center px-5 pt-3">
          <img
            src={ dadosUsuario.image }
            data-testid="profile-image"
            alt=""
            className="w-56 mx-auto h-56 rounded-full object-cover"
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
            '<button onClick={ this.return } className="w-full bg-dark text-white p-3 hover:font-bold hover:bg-more-dark transition duration-500 font-normal">
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
      <div className="bg-cover bg-fixed bg-party-4 relative">
      <div data-testid="page-profile" className="">        
      <div className="w-full bg-half-transparent justify-center items-center absolute z-10" />
          <Header />
        { this.retornaDadosUsuario() }
      </div>
      <Footer />
      </div>
    );
  }
}

export default Profile;
