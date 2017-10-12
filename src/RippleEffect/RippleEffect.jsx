import React from 'react';

const defaultStyle = {
  position: 'absolute',
  background: 'rgba(0,0,0,1)',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: 999,
  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
};

const EnhanceRippleEffect = (WrappedComponent) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rippleLength: 0,
        rippleLeft: 0,
        rippleTop: 0,
        rippleOpacity: 1,
        rippleTransform: 'scale(0)',
      };
    }

    clickToRipple = (e) => {
      const rect = e.target.getBoundingClientRect();
       // 获取父元素的大小
      const rippleLength = Math.max(rect.width, rect.height);
      // 获取鼠标的位置
      const MouseClientX = e.clientX;
      const MouseClientY = e.clientY;
      // 计算
      const rippleLeft = MouseClientX - rect.left - (rippleLength / 2);
      const rippleTop = MouseClientY - rect.top - (rippleLength / 2);

      this.setState({
        rippleLength,
        rippleLeft,
        rippleTop,
        rippleOpacity: 0,
        rippleTransform: 'scale(2)',
      });
    }

    render() {
      const { rippleLength, rippleLeft, rippleTop, rippleOpacity, rippleTransform } = this.state;
      let rippleNode = (
        <span
          style={{
            ...defaultStyle,
            width: rippleLength,
            height: rippleLength,
            left: rippleLeft,
            top: rippleTop,
            opacity: rippleOpacity,
            transform: rippleTransform,
          }}
        />
      );
      return React.cloneElement(
        <WrappedComponent />,
        {
          ripple: rippleNode, // 传递给包装组件的元素
          clickToRipple: this.clickToRipple, // 传递给包装组建的点击事件，用于生成波纹
        });
    }
 };
};

export default EnhanceRippleEffect;

