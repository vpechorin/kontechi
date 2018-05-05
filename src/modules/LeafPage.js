import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {EntypoAttachment} from 'react-entypo';
import ImageCarousel from './ImageCarousel';
import { IMGPATH } from '../app/constants';

class LeafPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowSize: window.innerWidth
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  updateWindowSize = () => {
    this.setState({ windowSize: window.innerWidth });
  }

  fileDetails = (f) => {
    if (!f) return {};
    if (!this.props.site) return {};
    return {
      id: f.id,
      url: `${IMGPATH}/${this.props.site.id}${f.absolutePath}`,
      size: f.hfileSize,
      caption: f.title || f.name,
      name: f.name,
    };
  }

  leftNav = () => {
    const secondLevel = this.props.parent && this.props.parent.name === 'home';

    if (this.state.windowSize < 992 || secondLevel) {
      return <div/>;
    }

    return (
      <div className={'col-lg-2'}>
        <nav className="nav flex-column">
          {this.props.siblings.map(item => (
            <Link key={`sidelink-${item.id}`} className={item.active ? 'nav-link active' : 'nav-link'} to={`/c/${item.name}`}>
              {item.title}
              </Link>
            ))}
        </nav>
      </div>
    );
  }

  render() {

    const docs = this.props.page.docs || [];

    const docItems = docs.map(d => this.fileDetails(d))
      .map(d => (
        <div key={`att-${d.id}`} className={''}><EntypoAttachment/> <a className={'pl-2'} href={d.url}>{d.caption}</a>
          <span className="badge badge-primary ml-4">{d.size}</span>
        </div>
    ));

    return (
      <div>
        <div className={'row'}>
          {this.leftNav()}
          <div className={'col-sm-6 col-lg-5'}>
            <ImageCarousel images={this.props.page.images} site={this.props.site} showIndicators={false} showThumbs={true}/>
          </div>
          <div className={'col-sm-6 col-lg-5'}>
            <div dangerouslySetInnerHTML={{ __html: this.props.page.body }}/>
          </div>
        </div>

        {docItems.length > 0 ? (
          <div className={'row pt-2'}>
            <div className={'col-sm-12'}>
              <h4>Downloads:</h4>
              <div className={'m-4'}>
                {docItems}
              </div>
            </div>
          </div>
        ) : <div/>}
      </div>
    );
  }
}

LeafPage.propTypes = {
  page: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
  siblings: PropTypes.array.isRequired
};

export default LeafPage;
