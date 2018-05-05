import React from 'react';
import { Link } from 'react-router-dom';
import imageService from './ImageService';

class PageCard extends React.Component {

  render() {
    const page = this.props.page;
    const thumb = imageService.toThumbDetails(page.mainImage, this.props.site);
    if (thumb.url) {
      return (
        <Link to={`/c/${page.name}`} className={'card'}>
          <img className={'card-img-top'} src={`${thumb.url}`}/>
          <div className={'card-body'}>
            <p className="card-text">{page.title}</p>
          </div>
        </Link>
      );
    }
    return (
      <div className={'card'} key={`page-card-${page.id}`}>
        <div className={'card-body'}>
          <Link to={`/c/${page.name}`}><p className="card-text">{page.title}</p></Link>
        </div>
      </div>
    );
  }
}

export default PageCard;
