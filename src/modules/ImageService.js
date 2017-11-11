import { IMGPATH } from '../app/constants';

function toThumbDetails(img, site) {
  if (!img) return {};
  return {
    id: img.thumb.id,
    url: `${IMGPATH}/${site.id}${img.thumb.absolutePath}`,
    height: img.thumb.height,
    width: img.thumb.width,
  };
}

function toImageDetails(img, site) {
  console.log('toImageDetails', img, site)
  if (!img) return {};
  if (!site) return {};
  return {
    id: img.id,
    url: `${IMGPATH}/${site.id}${img.absolutePath}`,
    height: img.height,
    width: img.width,
    size: img.hfileSize,
    caption: img.name
  };
}

function toCarouselItem(img, site) {
  if (!img) return {};
  if (!site) return {};
  return {
    src: `${IMGPATH}/${site.id}${img.absolutePath}`,
    altText: `${img.name}`,
    caption: `${img.name}`
  };
}

export default {
  toThumbDetails,
  toImageDetails,
  toCarouselItem
};
