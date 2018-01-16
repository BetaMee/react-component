import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

// 样式
import Styles from './CarouselItem.css';
// 动画
import { Fade, Slide, LeftSlide } from '../Transitions';

const propTypes = {
  prev: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  counts: PropTypes.number.isRequired,
  local: PropTypes.number.isRequired,
  target: PropTypes.string.isRequired,
};

class CarouselItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      prev,
      current,
      next,
      counts,
      local,
      target,
      ...props
    } = this.props;

    let transitionFlag;
    if (prev === local) {
      transitionFlag = false; // 离开
    } else if (current === local) {
      transitionFlag = true; // 进入
    }
    return (
      <Slide
        in={transitionFlag}
        target={target}
      >
        <div
          styleName="container"
          {...props}
        />
      </Slide>
    );
  }
}

CarouselItem.propTypes = propTypes;

export default CSSModules(CarouselItem, Styles);
