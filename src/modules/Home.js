import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import ActionCreator from '../app/actionCreators';
import Loading from './Loading';

const homePageName = 'home';

export class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadPage(homePageName);
  }

  render() {
    if (!this.props.page) {
      return <Loading/>;
    }

    return (
      <div>
        <h1>{this.props.page.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.page.body }}/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const page = lodash.find(state.app.pages, (p) => p.name === homePageName);
  return {
    page: page
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  loadPage(pageName) {
    return dispatch(ActionCreator.loadPageByName(pageName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
