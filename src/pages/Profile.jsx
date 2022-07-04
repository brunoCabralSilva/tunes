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

  retornaDadosUsuario = () => {
    const { dadosUsuario, carregando } = this.state;
    if (carregando === true) {
      return <Carregando />;
    }
    console.log(dadosUsuario);
    const perfil = (
      <div className="profile-principal">
        <div className="profile div-img">
          <div className="img-name">
            <img
              src={ dadosUsuario.image }
              data-testid="profile-image"
              alt="imagem de perfil"
              id="imagem-profile"
            />
          </div>
        </div>
        <div className="informations">
          <p className="result-perfil"><strong>Perfil</strong></p>
          <div className="profile">
            <div>
              <strong>Nome:</strong>
            </div>
            <div>
              { dadosUsuario.name }
            </div>
          </div>
          <div className="profile">
            <div>
              <strong>E-mail:</strong>
            </div>
            <div>
              { dadosUsuario.email }
            </div>
          </div>
          <div className="profile">
            <div>
              <strong>Descrição:</strong>
            </div>
            <div>
              { dadosUsuario.description }
            </div>
          </div>
          <div className="div-link-edit-profile">
            <Link
              to="/profile/edit"
              className="link-edit-profile"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    );
    return perfil;
  }

  render() {
    return (
      <div data-testid="page-profile">
        <div className="barra-superior">
          <img src={ logo } alt={ logo } className="trybe-barra-superior" />
          <nav className="navigate">
            <Header />
            <Usuario />
          </nav>
        </div>
        { this.retornaDadosUsuario() }
      </div>
    );
  }
}

export default Profile;
