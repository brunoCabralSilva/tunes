import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Usuario from '../components/Usuario';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    carregando: false,
    textoNome: '',
    textoEmail: '',
    textoDescription: '',
    textoImage: '',
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const perfil = await getUser();
    this.setState({
      textoNome: perfil.name,
      textoEmail: perfil.email,
      textoDescription: perfil.description,
      textoImage: perfil.image,
      carregando: false,
    });
  }

  salvaDados = async () => {
    const { textoNome, textoEmail, textoDescription, textoImage } = this.state;
    const { history } = this.props;
    await updateUser({
      name: textoNome,
      email: textoEmail,
      image: textoImage,
      description: textoDescription,
    });
    history.push('/profile');
  }

  alteraPerfil = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  habilitaBotao = () => {
    const {
      textoNome: nome,
      textoEmail: email,
      textoDescription: desc,
      textoImagem: imagem,
    } = this.state;
    if (nome !== '' && email !== '' && desc !== '' && imagem !== '') {
      return false;
    }
    return true;
  }

  retornaDadosUsuario = () => {
    const {
      carregando,
      textoNome,
      textoDescription,
      textoImage,
      textoEmail,
    } = this.state;
    if (carregando === true) {
      return <Carregando />;
    }
    const perfil = (
      <div className="profile-principal">
        <div className="profile">
          <div>
            <img
              src={ textoImage }
              id="imagem-profile"
              data-testid="profile-image"
              alt="imagem de perfil"
            />
          </div>
        </div>
        <div className="informations">
          <div className="profile">
            <div>
              <strong>Nome:</strong>
            </div>
            <div>
              <input
                type="text"
                name="textoNome"
                value={ textoNome }
                data-testid="edit-input-name"
                className="input-edit-profile"
                onChange={ this.alteraPerfil }
              />
            </div>
          </div>
          <div className="profile">
            <div>
              <strong>E-mail:</strong>
            </div>
            <div>
              <input
                type="email"
                name="textoEmail"
                value={ textoEmail }
                data-testid="edit-input-email"
                className="input-edit-profile"
                onChange={ this.alteraPerfil }
                pattern=".+@beststartupever\.com"
              />
            </div>
          </div>
          <div className="profile">
            <div>
              <strong>Descrição</strong>
            </div>
            <div>
              <input
                type="text"
                name="textoDescription"
                value={ textoDescription }
                data-testid="edit-input-description"
                className="input-edit-profile"
                onChange={ this.alteraPerfil }
              />
            </div>
          </div>
          <div className="profile">
            <strong>Link para Imagem:</strong>
            <input
              type="text"
              name="textoImage"
              value={ textoImage }
              data-testid="edit-input-image"
              className="input-edit-profile"
              onChange={ this.alteraPerfil }
            />
          </div>
          <div className="div-link-edit-profile">
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ this.habilitaBotao() }
              onClick={ this.salvaDados }
              className="btn-salva-edit-profile"
            >
              Editar perfil
            </button>
          </div>
        </div>
      </div>
    );
    return perfil;
  }

  render() {
    return (
      <div data-testid="page-profile-edit">
        <nav className="navigate">
          <Header />
          <Usuario />
        </nav>
        <div>
          { this.retornaDadosUsuario() }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;
