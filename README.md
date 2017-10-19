## React-Components

这是一个基于react的一个组件库，主要是积累一些在工作学习过程中碰到的UI特效和奇思妙想，理解原理，并使用react的方式开发出来，封装成各类组件，方便之后的使用。

## 已完成的组件

### 1. RippleEffect效果

#### 使用

`./src/RippleEffect/RippleEffect.jsx`是封装后的高阶组件，使用方式: 

```js
import {
  EnhanceRippleEffect,
} from '../src';

const Button = (props) => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        backgroundColor: 'yellow',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseDown={props.MouseDownToRipple}
      onMouseUp={props.MouseUpToRipple}
      onMouseLeave={props.MouseLeaveToRipple}
    >
      {/*rippleeffect节点*/}
      <div>
        {props.ripple}
      </div>
    </div>
  );
};

const EnhanceBtn = EnhanceRippleEffect(Button);
```

EnhanceBtn就是增强后的有RippleEffect的组件，这里的关键是，在需要使用此效果的组件中，给顶级父元素必须添加属性: `overflow: 'hidden'`，
`position: 'relative'`， 还需绑定三个事件: `onMouseDown`、`onMouseUp`、`onMouseLeave`，使用props下发的`MouseDownToRipple`、`MouseUpToRipple`、`MouseLeaveToRipple`，节点需添加一个`props.ripple`作为效果容器。

#### future improvement: 

- 使用canvas绘制ripple效果
— 针对移动端优化，添加touch事件


## TODO