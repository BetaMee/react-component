import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';

// 引入UI库
import {
  Carousel,
  EnhanceRippleEffect,
} from '../src';


const Button = (props) => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        // top: 50,
        // left: 50,
        backgroundColor: 'yellow',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseDown={props.MouseDownToRipple}
      onMouseUp={props.MouseUpToRipple}
      onMouseLeave={props.MouseLeaveToRipple}
    >{props.ripple}</div>
  );
};

const EnhanceBtn = EnhanceRippleEffect(Button);

const App = () => (
  <div
    style={{
      width: 1000,
      height: 1000,
      overflow: 'hidden',
      // position: 'relative',
    }}
  >
    <EnhanceBtn />
  </div>
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('app'));
