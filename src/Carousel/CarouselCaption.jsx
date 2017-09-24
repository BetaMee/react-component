import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

// 样式
import Styles from './CarouselCaption.css';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const CarouselCaption = (props) => {
  return (
    <div
      styleName="container"
    >
      {props.children}
    </div>
  );
};

CarouselCaption.propTypes = propTypes;

export default CSSModules(CarouselCaption, Styles);
