import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

// 样式
import Styles from './CarouselItem.css';

const propTypes = {
  prev: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  counts: PropTypes.number.isRequired,
  local: PropTypes.number.isRequired,
};

class CarouselItem extends React.PureComponent {

  render() {
    const {
      prev,
      current,
      next,
      counts,
      local,
      ...props
    } = this.props;
    return (
      <div
        styleName="container"
        {...props}
      />
    );
  }
}

CarouselItem.propTypes = propTypes;

export default CSSModules(CarouselItem, Styles);
