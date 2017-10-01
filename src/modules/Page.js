import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import ActionCreator from '../app/actionCreators';
import Loading from './Loading';

export class Page extends React.Component {

  componentWillMount() {
    const pageName = this.props.match.params.pageName;
    console.log('pageName:', pageName);
    this.props.loadPage(pageName);
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
  const pageName = props.match.params.pageName;
  const page = lodash.find(state.app.pages, (p) => p.name === pageName);
  return {
    page: page
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  loadPage(pageName) {
    return dispatch(ActionCreator.loadPageByName(pageName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
