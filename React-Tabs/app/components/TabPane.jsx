import React,{Component} from 'react';
import classnames from 'classnames';

export default class TabPane extends Component{
    static propTypes={
        tab:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,
        order:PropTypes.string.isRequired,
        disable:PropTypes.bool,
        isActive:PropTypes.bool,
    };
    render(){
        const {classPrefix,className,isActive,children}=his.props;

        const classes=classnames({
            [className]:className,
            [`${classPrefix}-panel`]:true,
            [`${classPrefix}-active`]:isActive,
        });

        return(
            <div
                role="tabpanel"
                className={classes}
                aria-hidden={!isActive}
            >
                {children}
            </div>
        );
    }
}