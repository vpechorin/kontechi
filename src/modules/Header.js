import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';
import pageService from './PageService';
import ActionCreator from '../app/actionCreators';
import Loading from './Loading';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.site) {
      return <Loading/>;
    }

    const classes = this.props.isOpen
      ? 'collapse.show navbar-toggleable-ml navbar-collapse align-self-end'
      : 'collapse navbar-toggleable-ml navbar-collapse align-self-end';

    const siteProps = this.props.site.propertyMap ? this.props.site.propertyMap : {};

    return (
      <header>
        <LoadingBar/>

        <nav className={'bg-gradient-dark navbar navbar-expand-md navbar-dark bg-dark d-flex flex-row pl-2'}>
          <div className={'navbar-brand pt-0 pb-0'}>
            <div className={'d-flex flex-column'}>
              <div className={'align-self-start'}><Link to={'/'}><img src={'/static/logo-red1.png'} width={'38'} height={'52'} alt={this.props.site.title}/></Link></div>
              <div className={'align-self-start kt-logo'} dangerouslySetInnerHTML={{ __html: siteProps.logotext }}/>
            </div>
          </div>
          <button className="navbar-toggler align-self-baseline" type="button" onClick={this.props.toggle} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className={classes}>
            <ul className={'navbar-nav ml-auto mt-2 mt-lg-0'}>
              {this.props.topPages.map((item, index) => (
                <li className={'nav-item'} key={`menuitem-page-${item.id}`}>
                  <Link
                    className={item.active ? 'nav-link active' : 'nav-link'}
                    to={`/c/${item.name}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  topPages: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  const homePageName = (state.app && state.app.site) ? state.app.site.homePage : 'home';
  const homePage = pageService.findByName(state.app.pages, homePageName);
  const topPages = homePage ? pageService.getChildren(homePage, state) : [];
  return {
    site: state.app.site,
    topPages,
    isOpen: state.app.isMenuOpen ? state.app.isMenuOpen : false
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  toggle() {
    return dispatch(ActionCreator.toggleMenu());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
