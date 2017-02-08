import React,{Component} from 'react';
import classnames from 'classnames';

export default class Tabs extends Component{
    static propTypes={
        className:PropTypes.string,
        classPrefix:PropTypes.string,
        children:PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        //默认激活索引，组件内更新
        defaultActiveIndex:PropTypes.number,
        //默认激活索引，组件外更新
        activeIndex:PropTypes.number,
        onChange:PropTypes.func,
    };

    static defaultProps={
        classPrefix: 'tab',
        onChange:()=>{},
    }

    constructor(props){
        super(props);
        this.handleTabClick=this.handleTabClick.bind(this);

        const currProps=this.props;

        let activeIndex;
        //初始化activeIndex state
        if('activeIndex' in currProps){
            activeIndex=currProps.defaultActiveIndex;
        }else if('defaultActiveIndex' in currProps){
            activeIndex=currProps.defaultActiveIndex;
        }

        this.state={
            activeIndex,
            preIndex:activeIndex
        };
    }

    componentWillReceiveProps (nextProps) {
        //如果props传入activeIndex，则直接更新
        if('activeIndex' in nextProps){
            this.setState({
                activeIndex:nextProps.activeIndex
            });
        }
    }

    handleTabClick(activeIndex){
        const preIndex=this.state.activeIndex;

        //如果当前activeIndex与传入的activeIndex不一致
        //并且props中存在defaultActiveIndex时，则更新
        if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props){
            this.setState({
                activeIndex,
                preIndex,
            });
            //更新后执行回调函数，抛出当前索引和上一次索引
            this.props.onChange({activeIndex,preIndex});
        }
    }

    renderTabNav(){
        const {classPrefix,children}=this.props;

        return(
            <TabNav
                key="tabBar"
                classPrefix={classPrefix}
                onTabClick={this.handleTabClick}
                panels={children}
                activeIndex={this.state.activeIndex}
            />
        );
    }

    renderTabContent(){
        const {classPrefix,children}=this.props;

        return(
            <TabContent
                key="tabcontent"
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
            />
        );
    }
    
    render(){
        const {className}=this.props;
        //classnames用于合并class
        const classes=classnames(className,'ui-tabs');

        return (
            <div className={classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        );
    }
}