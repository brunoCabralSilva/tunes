import React from 'react';
import { getUser } from '../services/userAPI';
import imagem from '../images/user_icon.png';

class Usuario extends React.Component {
  state = {
    carregando: true,
    nomeUser: '',
  }

  componentDidMount = async () => {
    const objUsuario = await getUser();
    this.setState({
      carregando: false,
      nomeUser: objUsuario.name,
    });
  }

  render() {
    const { carregando, nomeUser } = this.state;
    return (
      <div className="user" data-testid="header-user-name">
        { carregando === true ? 'Carregando...' : nomeUser }
        <img alt="Ícone de Usuário" src={ imagem } />
      </div>
    );
  }
}

export default Usuario;
