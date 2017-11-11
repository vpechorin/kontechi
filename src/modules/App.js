import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ActionCreator from '../app/actionCreators';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.dispatch(ActionCreator.loadSiteByName());
    this.props.store.dispatch(ActionCreator.loadSitePages());
  }

  render() {
    console.log('app page render')
    return (
      <div className="container-fluid pl-0 pr-0">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  /*eslint react/forbid-prop-types:0*/
  store: PropTypes.object.isRequired
};

export default App;
