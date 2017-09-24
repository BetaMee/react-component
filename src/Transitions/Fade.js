import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 5000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
};

const Fade = ({ in: inProp, children: Component }) => (
  <Transition in={inProp} timeout={duration}>
    {state => React.cloneElement(Component, {
      style: {
        ...defaultStyle,
        ...transitionStyles[state],
      },
    })
    }
  </Transition>
);

export default Fade;
