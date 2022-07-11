import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/trybe.png';
import Usuario from '../components/Usuario';

class Header extends React.Component {
  render() {
    const { classe } = this.props;
    return (
      <nav className="flex flex-col items-center relative min-h-10p z-20">
      <div className="flex flex-row justify-between w-full mt-3 sm:mt-1 z-20 relative">
        <div className='w-56 z-20 mt-2'>
        <img src={ logo } alt={ logo } className="sm:w-14 w-10 pl-4 object-contain" />
        </div>
        <header data-testid="header-component" className={`${classe} hidden md:flex z-20 relative flex-rol flex-wrap justify-center items-center font-bold text-white`}>
        <Link
          to="/search"
          className="px-3 text-white hover:text-light-blue transition duration-1000 ease-out"
          data-testid="link-to-search"
        >
          Pesquisar
        </Link>
        <span>|</span>
        <Link
          to="/favorites"
          className="px-3 text-white hover:text-light-blue transition duration-1000 ease-out"
          data-testid="link-to-favorites"
        >
          Favoritos
        </Link>
        <span>|</span>
        <Link
          to="/profile"
          className="px-3 text-white hover:text-light-blue transition duration-1000 ease-out"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
      <div className='w-56'>
        <Usuario />
        </div>
      </div>
      <header data-testid="header-component" className={`${classe} md:hidden flex p-4 z-20 relative flex-rol flex-wrap justify-center items-center font-bold text-white`}>
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
    </nav>
    );
  }
}

export default Header;
