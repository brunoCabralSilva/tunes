import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component" className="menu-principal">
        <Link
          to="/search"
          className="links-menu"
          data-testid="link-to-search"
        >
          Pesquisar
        </Link>
        <span>|</span>
        <Link
          to="/favorites"
          className="links-menu"
          data-testid="link-to-favorites"
        >
          Favoritos
        </Link>
        <span>|</span>
        <Link
          to="/profile"
          className="links-menu"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
