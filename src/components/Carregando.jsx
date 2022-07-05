import React from 'react';
import '../index.css';

class Carregando extends React.Component {
  render() {
    return (
      <div data-testid="page-login" className="flex flex-row min-h-screen relative">
        <div className="bg-half-transparent w-full h-full absolute z-10"></div>
        <div className="w-full h-screen absolute">
          <img src={require("../images/musica.jpg")} className="h-screen w-full object-cover absolute" alt=""/>
        </div>
        <div className="w-full flex flex-col items-center h-screen items-center justify-center text-5xl text-white z-20">
          Carregando...
          <div className="relative w-20 h-20 m-5 z-20 flex flex-row items-center justify-center">
            <div className="loading w-4 h-4 bg-white rounded-full absolute"> </div>
            <div className="loading w-4 h-4 bg-white rounded-full absolute"> </div>
            <div className="loading w-4 h-4 bg-white rounded-full absolute"> </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Carregando;
