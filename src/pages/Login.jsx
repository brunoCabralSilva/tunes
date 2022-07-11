import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state= {
    habilitaBtnLogin: true,
    nomeDigitado: '',
    carregando: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  verificaTamanho = ({ target }) => {
    const { value } = target;
    const minimo = 3;
    this.setState({ nomeDigitado: value });
    if (value.length >= minimo) {
      this.setState({ habilitaBtnLogin: false });
    } else {
      this.setState({ habilitaBtnLogin: true });
    }
  }

  mudaEstiloBotao = () => {
    const { habilitaBtnLogin } = this.state;
    const classeBotao = habilitaBtnLogin ? 'bg-light text-dark hover:bg-gray-400' : 'bg-dark text-white hover:bg-more-dark';
    return classeBotao;
  }

  salvaNome = async () => {
    const { history } = this.props;
    const { nomeDigitado } = this.state;
    this.setState({ carregando: true });
    await createUser({ name: nomeDigitado });
    this.setState({ carregando: true });
    history.push('/search');
  }

  render() {
    const { habilitaBtnLogin, nomeDigitado, carregando } = this.state;
    if (carregando === true) {
      return (<Carregando bg="bg-party" />);
    }
    return (
      <div data-testid="page-login" className="flex flex-row min-h-screen relative">
        <div className="w-full h-screen absolute">
          <img src={require("../images/musica.jpg")} className="h-screen w-full object-cover absolute" alt=""/>
        </div>
        <div className="w-full flex items-center h-screen justify-center">
          <div className="lg:w-1/5 h-70 bg-white border drop-shadow-xl rounded flex flex-col justify-around items-center relative z-10">
            <div className="flex flex-row items-center justify-center w-full h-1/2">
              <img src={require('../images/trybe-dark.png')} alt="" className="w-10 pb-3 mr-3 sm:mr-58uhbn 89ui m" />
              <p className="text-dark text-2xl font-bold">TrybeTunes</p>
            </div>
            <div className="w-9/12 flex flex-col justify-center">
            <label htmlFor="input-login" className="w-full mt-1 text-dark text-left">
              <input
                type="text"
                data-testid="login-name-input"
                value={ nomeDigitado }
                name="input-login"
                id="input-login"
                placeholder="Login"
                className="bg-light rounded-full border-bottom p-2 w-full text-center text-black"
                onChange={ this.verificaTamanho }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              className={ `${this.mudaEstiloBotao()} mt-3 p-2 mb-5 rounded-full transition duration-1000` }
              disabled={ habilitaBtnLogin }
              onClick={ this.salvaNome }
            >
              <strong className="">
                Entrar
              </strong>
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
