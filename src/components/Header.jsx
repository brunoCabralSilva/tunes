import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { classe } = this.props;
    return (
      <header data-testid="header-component" className={`${classe} flex-rol flex-wrap justify-center items-center font-bold text-dark`}>
        <Link
          to="/search"
          className="px-3"
          data-testid="link-to-search"
        >
          Pesquisar
        </Link>
        <span>|</span>
        <Link
          to="/favorites"
          className="px-3"
          data-testid="link-to-favorites"
        >
          Favoritos
        </Link>
        <span>|</span>
        <Link
          to="/profile"
          className="px-3 "
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
