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
      <div className="flex flex-row rounded-full justify-center p-1 items-center text-sm sm:text-base bg-light ml-2 mr-2 mt-0 mb-2 sm:m-2 text-dark" data-testid="header-user-name">
        <img alt="Ícone de Usuário" src={ imagem } className="w-6 sm:w-10" />
        <span className="px-2">{ carregando === true ? 'Carregando...' : nomeUser }</span>
      </div>
    );
  }
}

export default Usuario;
