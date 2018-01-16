import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';


// 样式
import Styles from './Carousel.css';
// 子组件
import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import CarouselDot from './CarouselDot';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prev: 0,
      current: 0,
      next: 0,
      counts: 0,
      target: 'none', // 'left', 'right', 'none' 运动的方向
    };
  }


  componentWillMount() {
    const { children } = this.props;
    const counts = React.Children.count(children);
    this.setState({
      current: 0,
      next: this.state.current + 1,
      prev: counts - 1,
      counts,
      target: 'left',
    });
  }

  _play = () => {

  }

  _goToNext = () => {
    const {
      current,
      prev,
      next,
      counts,
    } = this.state;

    let newNext;
    if (next === counts - 1) {
      newNext = 0;
    } else {
      newNext = next + 1;
    }

    const newCurrent = next;
    const newPrev = current;
    // 更新
    this.setState({
      current: newCurrent,
      prev: newPrev,
      next: newNext,
    });
  }

  _goToPrev = () => {

  }

  render() {
    const { children } = this.props;
    const {
      current,
      counts,
    } = this.state;
    return (
      <div
        styleName="container"
      >
        {React.Children.map(children, (element, index) => {
          return React.cloneElement(element, {
            ...this.state,
            key: index,
            local: index,
          });
        })}
        <CarouselDot
          counts={counts}
          current={current}
          handleChlick={this._goToNext}
        />
      </div>
    );
  }
}

Carousel.propTypes = propTypes;

Carousel.Caption = CarouselCaption;
Carousel.Item = CarouselItem;

export default CSSModules(Carousel, Styles);
