import React from 'react';
import '../index.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="principal-login loading">
        Carregando...
        <div id="icone-carregando">
          <div className="icone-loading"> </div>
          <div className="icone-loading"> </div>
          <div className="icone-loading"> </div>
        </div>
      </div>
    );
  }
}
export default Carregando;
