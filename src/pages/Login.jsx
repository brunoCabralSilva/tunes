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
    const classeBotao = habilitaBtnLogin ? 'btn-disabled-login' : 'btn-login';
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
      return (<Carregando />);
    }
    return (
      <div data-testid="page-login" className="flex flex-row min-h-screen relative">
        <div className="object-cover w-screen h-screen absolute">
          <img src="https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80" className="h-screen w-screen object-cover" alt=""/>
        </div>
        <div className="w-full flex items-center justify-center bg-gray-300">
          <div className="1/2 lg:w-2/6 h-2/4 bg-lilas drop-shadow-xl rounded flex flex-col justify-center items-center relative z-10 rounded-l">
            <div className="flex flex-row items-center justify-center">
              <img src={require('../images/trybe.png')} alt="" className="w-12 pb-3 mr-3 sm:mr-5" />
              <p className="text-white text-2xl font-bold">TrybeTunes</p>
            </div>
            <label htmlFor="input-login" className="w-10/12 mt-2 text-gray-500 text-center">
              <input
                type="text"
                data-testid="login-name-input"
                value={ nomeDigitado }
                name="input-login"
                id="input-login"
                className="bg-gray-300 p-2 mt-2 w-full text-center text-black"
                placeholder="Login"
                onChange={ this.verificaTamanho }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              className={ `${this.mudaEstiloBotao()} -10/12 mt-6 p-2 rounded h-1/5 bg-gray-300 w-10/12` }
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
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
