import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';




var IntervalEnhance = ComponsedComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: this.props.seconds
        };
    }
    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    tick() {
        this.setState({
            seconds: this.state.seconds + 1
        });
    }
    
    render() {
        /**
         * 传递进来的组件，有seconds props，增强函数为其添加了seconds state
         * 渲染的时候，重名的属性，后面会覆盖前面的，所以传递进来的属性，就变成了高阶
         * 组件的状态，这样在ComponsedComponent里就可以改变seconds了
         */
        return <ComponsedComponent {...this.props} {...this.state} />;
    }
}

class CartItem extends Component {
    render() {
        return (
            <div>
                <p>
                    <strong>Time elapsed for interval: </strong>
                    {this.props.seconds} s
                </p>
            </div>
        )
    }
}

var EhCartItem=IntervalEnhance(CartItem);





class App extends Component{
  render(){
    console.log("hh");
    return (
        <div>
            <EhCartItem seconds={6}/>
            {this.props.children}
        </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
