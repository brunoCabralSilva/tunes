import React from 'react';

class NotFound extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div data-testid="page-not-found">
        Not Found
      </div>
    );
  }
}

export default NotFound;
