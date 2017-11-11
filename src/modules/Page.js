import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ActionCreator from '../app/actionCreators';
import Loading from './Loading';
import SubPages from './SubPages';
import LeafPage from './LeafPage';
import pageService from './PageService';
import Breadcrumbs from './Breadcrumbs';

class Page extends React.Component {
  componentWillMount() {
    const pageName = this.props.match.params.pageName;
    this.props.activatePage(pageName);
    this.props.loadPage(pageName);
  }

  render() {
    console.log('page render')
    if (!this.props.page || !this.props.site) {
      return <Loading/>;
    }

    console.log('page render 2')

    const hasChildren = (typeof this.props.children != "undefined" && this.props.children != null && this.props.children.length > 0);

    return (
      <div className={'kt-page-container px-2'}>
        <Helmet titleTemplate={`%s | ${this.props.site.domain}`}>
          <title>{this.props.page.htmlTitle || this.props.page.title}</title>
          <meta name="description" content={this.props.page.description} />
          <link rel="canonical" href={`https://${this.props.site.domain}/${this.props.page.name}`} />
        </Helmet>
        <Breadcrumbs items={this.props.parents} site={this.props.site} page={this.props.page}/>
        <div className={'kt-page-content'}>
          <h1>{this.props.page.title}</h1>
          {
            hasChildren
              ? <SubPages pages={this.props.children} site={this.props.site}/>
              : <LeafPage page={this.props.page} site={this.props.site} parents={this.props.parents} parent={this.props.parent} siblings={this.props.siblings}/>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const pageName = props.match.params.pageName;

  const page = state.app.pages ? pageService.findByName(state.app.pages, pageName) : {};
  return {
    ...props,
    pagesLoaded: state.app.pages > 1,
    page,
    children: page ? pageService.getChildren(page, state) : [],
    siblings: page ? pageService.getSiblings(page, state) : [],
    site: state.app.site,
    parents: pageService.getPageParents(pageName, state.app.pages),
    parent: (page && page.parentId) ? pageService.findById(state.app.pages, page.parentId) : null
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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
