import React from 'react';
import Helmet from 'react-helmet';

class NotFound extends React.Component {

  render() {
    return (
      <div className={'kt-page-container px-2'}>
        <Helmet>
          <title>Error - Not Found </title>
        </Helmet>
        <div className={'kt-page-content'}>
          <h1>Not Found</h1>
          <div className="alert alert-warning" role="alert">
            {'We couldn\'t find the page you are looking for..'}
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
