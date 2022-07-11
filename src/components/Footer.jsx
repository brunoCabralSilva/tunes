import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="bg-dark-transparent flex sm:flex-row flex-col items-center sm:items-around sm:justify-around p-4 sm:p-1 sm:px-4 text-white relative z-20">
          <div className="my-3 w-full md:w-50vw">
            <p className="text-center md:text-left w-full"><strong>Contato:</strong> (83)9 9836-4408 / bruno.cabral.silva2018@gmail.com</p>
          </div>
          <div className="flex flex-row my-3 w-full md:w-15vw justify-center">
            <div className="icons">
              <i className="fa-brands fa-facebook px-2"></i>
              <i className="fa-brands fa-instagram px-2"></i>
              <i className="fa-brands fa-youtube px-2"></i>
              <i className="fa-brands fa-linkedin px-2"></i>
            </div>
          </div>
          <div className="w-full md:w-43vw">
            <p className="text-center md:text-right my-3 ">© 2022 Copyright - Bruno Gabryell Cabral da Silva</p>
          </div>
        </div>
      </footer >
    );
  }
}