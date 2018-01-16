import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 500;

const defaultStyle = {
  transition: `left ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
};


const getDefaultStyle = (inProp, target) => {
  if (!inProp && target === 'left') { // 向左离开
    return {
      ...defaultStyle,
      left: '-100%',
    };
  } else if (!inProp && target === 'right') { // 向右离开
    return {
      ...defaultStyle,
      left: '100%',
    };
  } else if (inProp) { // 从左或者从右进来
    return {
      ...defaultStyle,
      left: '0%',
      opacity: 1,
    };
  }
};

const getTransitionStyle = (state, target) => ({
  entering: { visibility: 'visible' }, // 进入状态
  entered: { visibility: 'visible' },
  exiting: { visibility: 'visible', opacity: 1 }, // 离开状态
  exited: { visibility: 'hidden', left: '100%' },
});

const Slide = ({ in: inProp, children: Component, target }) => (
  <Transition in={inProp} timeout={duration}>
    {state => React.cloneElement(Component, {
      style: {
        ...getDefaultStyle(inProp, target),
        ...getTransitionStyle(state, target),
      },
    })
    }
  </Transition>
);

export default Slide;
