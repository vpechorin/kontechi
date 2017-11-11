import React from 'react';
import PageCard from './PageCard';

class SubPages extends React.Component {

  render() {
    const pages = this.props.pages;
    if (!pages || pages.length === 0) {
      return <div/>;
    }

    return (
      <div className={'card-columns'}>
        {pages.map(page => (
          <PageCard key={`page-card-${page.id}`} page={page} site={this.props.site}/>
        ))}
      </div>
    );
  }
}

export default SubPages;
