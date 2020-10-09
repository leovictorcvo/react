import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default ({ imageUrl, alternateText, styleClass }) => (
  <LazyLoadImage
    src={imageUrl}
    alt={alternateText}
    className={styleClass}
    wrapperProps={{ style: { display: 'contents' } }}
    effect="blur"
  />
);
