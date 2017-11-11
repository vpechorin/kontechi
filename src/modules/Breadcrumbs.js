import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Breadcrumbs extends React.Component {

  render() {
    let items = this.props.items;
    if (items.length === 1 && items[0].name === this.props.site.homePage) {
      items = [];
    }

    if (items.length === 0) {
      return (
        <div/>
      );
    }

    return (
      <div className={'d-none d-md-block'}>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className={'breadcrumb'}>
            {items.map(item => (
              <li key={`bc-item-${item.id}`} className={'breadcrumb-item'}>
                <Link to={`/c/${item.name}`}>{item.title}</Link>
              </li>
            ))}
            <li key={`bc-item-${this.props.page.id}`} className={'breadcrumb-item active'} aria-current={'page'}>
              {this.props.page.title}
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.array.isRequired,
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
};

export default Breadcrumbs;
