import React, { Component } from 'react';
import './styles.scss';

class Dropdown extends Component {
    state = {
        isExpanded: false
    };

    onItemClick = (item) => {
        this.setState({isExpanded: false});
        item.action();
    }

    toggleExpand = () => {
        let { isExpanded } = this.state;
        this.setState({isExpanded: !isExpanded});
    }

    render() {
        let { title, items } = this.props;
        let { isExpanded } = this.state;
        return (
            <div className="tw-dropdown" onClick={this.toggleExpand}>
                <span>
                    {title}
                </span>
                <span className="arrow-icon">
                    <i className="fa fa-angle-down"/>
                </span>
                {isExpanded &&
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={this.onItemClick}    
                                >
                                    {item.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    }
}

export default Dropdown;