import React from 'react';

// 定义在ripple类上的时间戳
let timekey = null;

const EnhanceRippleEffect = WrappedComponent => class extends React.PureComponent {

  MouseLeaveToRipple = (e) => {
    // 当timekey存在但是触发了mouseleave事件，则主动出发up事件
    if (timekey) {
      this.MouseUpToRipple(e);
    }
  }

  MouseUpToRipple = (e) => {
    // 当timekey为null，则说明之前mousedown存在错误，则进行屏蔽
    if (!timekey) {
      return;
    }
    const $rippleNode = e.target.querySelector(`.ripple-${timekey}`);
    timekey = null;
    const frames = [
      { opacity: 1 },
      { opacity: 0 },
    ];
    const timing = {
      duration: 300,         // 300ms
      delay: 0,               // 0ms
      iterations: 1,   // 1, 2, 3 ... Infinity
      direction: 'normal', // 'normal', 'reverse'等
      easing: 'ease-in-out',  // 'linear', 'ease-in'等
      fill: 'backwards',       //'backwards', 'both', 'none', 'auto'
    };
    $rippleNode.animate(frames, timing);
    // 延迟消失
    setTimeout(() => {
      $rippleNode.remove();
    }, 250);
  }

  MouseDownToRipple = (e) => {
    // 当timekey有值，则说明之前mouseup存在错误，则进行屏蔽
    if (timekey) {
      return;
    }
    timekey = new Date().getTime();
    const rect = e.target.getBoundingClientRect();
      // 获取父元素的大小
    const rippleLength = Math.max(rect.width, rect.height);
    // 获取鼠标的位置
    const MouseClientX = e.clientX;
    const MouseClientY = e.clientY;
    // 计算
    const rippleLeft = MouseClientX - rect.left - (rippleLength / 2);
    const rippleTop = MouseClientY - rect.top - (rippleLength / 2);
    // 生成新的span
    const $rippleNode = document.createElement('span');
    $rippleNode.setAttribute('class', `ripple-${timekey}`);
    $rippleNode.setAttribute(
      'style',
      `top: ${rippleTop}px;left: ${rippleLeft}px;width: ${rippleLength}px;height: ${rippleLength}px;position: absolute;background: rgba(0,0,0,0.3);border-radius: 50%;pointer-events: none;z-index: 9999;`,
    );
    // 添加到DOM结构上
    const $rippleWrapper = e.target.querySelector('.ripplewrapper');
    $rippleWrapper.appendChild($rippleNode);
    // 通过web animate进行动画
    const frames = [
      { transform: 'scale(0)', opacity: 1 },
      { transform: 'scale(2)', opacity: 1 },
    ];
    const timing = {
      duration: 300,         // 300ms
      delay: 0,               // 0ms
      iterations: 1,   // 1, 2, 3 ... Infinity
      direction: 'normal', // 'normal', 'reverse'等
      easing: 'ease-in-out',  // 'linear', 'ease-in'等
      fill: 'forwards',       //'backwards', 'both', 'none', 'auto'
    };
    $rippleNode.animate(frames, timing);
  }

  render() {
    const rippleWrapper = <div className="ripplewrapper" style={{ pointerEvents: 'none' }} />;
    return React.cloneElement(
      <WrappedComponent />,
      {
        ripple: rippleWrapper, // 传递给包装组件的元素
        MouseDownToRipple: this.MouseDownToRipple, // 传递给包装组建的点击事件，用于生成波纹
        MouseUpToRipple: this.MouseUpToRipple,
        MouseLeaveToRipple: this.MouseLeaveToRipple,
      });
  }
 };

export default EnhanceRippleEffect;
