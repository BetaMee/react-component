import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 5000;

const defaultStyle = {
  enter: {
    transition: `left ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    left: '100%',
    display: 'none',
    opacity: 0,
  },

  exit: {
    transition: `left ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    left: '100%',
    display: 'none',
    opacity: 0,
  },
};


const transitionStyles = {
  enter: { // slideToLeft, slideFromLeft
    entering: { opacity: 1, display: 'block', left: 0 }, // 进入状态
    entered: { opacity: 1, display: 'block', left: 0 },
    exiting: { opacity: 0, display: 'none', left: '-100%' }, // 离开状态
    exited: { opacity: 0, display: 'none', left: '-100%' },
  },

  exit: { // slideToRight, slideFromRight
    entering: { opacity: 1, display: 'block', left: 0 }, // 进入状态
    entered: { opacity: 1, display: 'block', left: 0 },
    exiting: { opacity: 0, display: 'block', left: '100%' }, // 离开状态
    exited: { opacity: 0, display: 'block', left: '100%' },
  },
};

const LeftSlide = ({ in: inProp, children: Component, target }) => (
  <Transition in={inProp} timeout={duration}>
    {state => React.cloneElement(Component, {
      style: {
        ...defaultStyle[target],
        ...transitionStyles[target][state],
      },
    })
    }
  </Transition>
);

export default LeftSlide;
