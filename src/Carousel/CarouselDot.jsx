import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// 样式
import Styles from './CarouselDot.css';

const propTypes = {
  counts: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

const defaultProps = {
  counts: 2,
  current: 0,
};

const CarouselDot = ({ counts, current, handleChlick }) => {
  const dotNodes = [];
  for (let i = 0; i < counts; i++) {
    dotNodes.push(
      <span
        key={`dot${i}`}
        styleName={classNames('dot-default', i === current ? 'dot-active' : '')}
        onClick={handleChlick}
      />,
    );
  }
  return (
    <div
      styleName="contanier"
    >
      {dotNodes}
    </div>
  );
};

CarouselDot.propTypes = propTypes;
CarouselDot.defaultProps = defaultProps;

export default CSSModules(CarouselDot, Styles, { allowMultiple: true });
