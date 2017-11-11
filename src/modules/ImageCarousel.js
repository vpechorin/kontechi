import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import imageService from './ImageService';

class ImageCarousel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.images) {
      return (
        <div/>
      );
    }

    const items = this.props.images.map(p => imageService.toCarouselItem(p, this.props.site));

    if (items.length > 1) {
      return (
        <Carousel showStatus={false} dynamicHeight showIndicators={this.props.showIndicators} showThumbs={this.props.showThumbs}>
          {items.map(item => (
            <div key={item.src}>
              <img src={item.src} alt={item.altText}/>
            </div>
          ))}
        </Carousel>
      );
    }

    if (items.length === 1) {
      const item = items[0];
      return (
        <div>
          <img
            src={item.src}
            className={'img-fluid'}
            alt={item.altText}
          />
        </div>);
    }

    return (
      <div/>
    );
  }
}

export default ImageCarousel;
