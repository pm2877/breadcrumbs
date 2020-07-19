/*global chrome*/

import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';
import './App.css';
import StackItem from './stackItem';

export default class App extends React.Component {
    static propTypes = {
        breadcrumb: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: [],
            isCollapsed: false
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage(
            {message: 'get_breadcrumb'},
            function(response) {
                this.setState({breadcrumb: response.breadcrumb});
            }.bind(this)
        );
    }

    handleButtonClick() {
        this.setState(state => ({
            isCollapsed: !state.isCollapsed
        }));
        console.log('+++++++++ isCollapsed', this.state.isCollapsed);
    }

    render() {
        const {breadcrumb = [], isCollapsed} = this.state;
        return (
            <div className="App">
                <div className="button-column">
                    <input
                        type="button"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                        value={isCollapsed ? '<<' : '>>'}
                        className={
                            isCollapsed
                                ? 'collapsed-input-button'
                                : 'input-button'
                        }
                        onClick={() => this.handleButtonClick()}
                    />
                </div>
                <div
                    className={
                        isCollapsed
                            ? 'collapsed-content-column'
                            : 'content-column'
                    }
                >
                    <header className="App-header">
                        <img
                            src={logo}
                            className="App-logo"
                            alt="logo"
                            title="Breadcrumbs"
                        />
                    </header>
                    <div className="App-stack-view">
                        {breadcrumb.map((crumb, index) => {
                            console.log('crumb: ', crumb, ' -> index: ', index);
                            return (
                                <StackItem
                                    key={index}
                                    index={index}
                                    details={crumb}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
