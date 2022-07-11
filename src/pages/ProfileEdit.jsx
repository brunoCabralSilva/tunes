import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    window.scrollTo(0, 0);
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
        <div className="flex justify-center items-center text-dark mt-8">
        <div className="w-80 bg-light z-20 rounded-xl flex flex-col justify-center px-5 pt-5 mb-8">
          <img
            src={ textoImage }
            data-testid="profile-image"
            alt="imagem de perfil"
            className="w-56 mx-auto h-56 rounded-full object-cover"
          />
        <div className="flex flex-col">
          <p className="w-full text-center pt-3 pb-2"><strong>Editar Perfil</strong></p>
          <div className="flex-col flex">
            <div className="flex flex-row">
              <div>
                <strong className="pr-1">Nome:</strong>
                <input
                  type="text"
                  name="textoNome"
                  value={ textoNome }
                  data-testid="edit-input-name"
                  className="w-full"
                  onChange={ this.alteraPerfil }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div>
            <strong className="pr-1">E-mail:</strong>
            <input
              type="email"
              name="textoEmail"
              value={ textoEmail }
              data-testid="edit-input-email"
              className="w-full"
              onChange={ this.alteraPerfil }
              pattern=".+@beststartupever\.com"
            />
            </div>
          </div>
          <div className="flex flex-row">
            <div>
            <strong className="pr-1">Descrição:</strong>
            <input
              type="text"
              name="textoDescription"
              value={ textoDescription }
              data-testid="edit-input-description"
              className="w-full"
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
              className="w-full"
              onChange={ this.alteraPerfil }
            />
          </div>
            '<button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ this.habilitaBotao() }
                  onClick={ this.salvaDados }
                  className="w-full bg-dark text-white p-3 font-normal hover:font-bold hover:bg-more-dark transition duration-500"
                >
                  Editar perfil
                </button>'
          </div>
        </div>
      </div>);
      return perfil;
  }

  render() {
    return (
      <div data-testid="page-profile" className="min-h-100vh bg-cover bg-fixed bg-party-4 relative">        
      <div className="w-full h-full bg-half-transparent justify-center items-center absolute z-10" />
          <Header />
        <div>
          { this.retornaDadosUsuario() }
        </div>
        <Footer />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;
