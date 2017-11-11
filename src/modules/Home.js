import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Loading from './Loading';
import pageService from './PageService';
import ImageCarousel from './ImageCarousel';
import ActionCreator from '../app/actionCreators';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageName: props.site ? props.site.homePage : undefined
    };

    if (this.state.pageName) {
      this.props.loadPage(this.state.pageName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.site && nextProps.site.homePage !== this.state.pageName) {
      this.setState({pageName: nextProps.site.homePage});
      this.props.loadPage(nextProps.site.homePage);
    }
  }

  render() {
    if (!this.props.page || !this.props.site) {
      return <Loading/>;
    }

    return (
      <div className={'kt-page-container px-0'}>
        <Helmet>
          <title>{this.props.page.htmlTitle || this.props.page.title}</title>
          <meta name="description" content={this.props.page.description} />
          <link rel="canonical" href={`https://${this.props.site.domain}/`} />
        </Helmet>
        <ImageCarousel images={this.props.page.images} site={this.props.site} showIndicators={true} showThumbs={false}/>
        <div className={'pt-4 px-2'} dangerouslySetInnerHTML={{ __html: this.props.page.body }}/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const pageName = state.app.site ? state.app.site.homePage : undefined;
  const page = (state.app.pages && pageName) ? pageService.findByName(state.app.pages, pageName) : {};
  return {
    ...props,
    page,
    site: state.app.site
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  activatePage(pageName) {
    return dispatch(ActionCreator.updateActivePage(pageName));
  },
  loadPage(pageName) {
    return dispatch(ActionCreator.loadPageByName(pageName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
