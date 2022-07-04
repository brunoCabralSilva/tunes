import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import logo from '../images/trybe.png';

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
      <div data-testid="page-login" className="bg-black">
        <img src={ logo } alt="Logo Trybe" className="" />
        <input
          type="text"
          data-testid="login-name-input"
          value={ nomeDigitado }
          name="input-login"
          className=""
          placeholder="Login"
          onChange={ this.verificaTamanho }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          className={ this.mudaEstiloBotao() }
          disabled={ habilitaBtnLogin }
          onClick={ this.salvaNome }
        >
          <strong>
            Entrar
          </strong>
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
