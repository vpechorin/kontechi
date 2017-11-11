import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

export class Footer extends React.Component {

  render() {
    if (!this.props.site) {
      return <Loading/>;
    }

    const siteProps = this.props.site.propertyMap ? this.props.site.propertyMap : {};
    const footerText = siteProps.footer || '';

    return (
      <footer className={'bg-dark text-light p-2'}>
        <div dangerouslySetInnerHTML={{__html: footerText}}/>
      </footer>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    site: state.app.site,
  };
}

export default connect(mapStateToProps)(Footer);
