/*global chrome*/

import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
    render() {
        const {breadcrumb = []} = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    {/* {this.props.isExt ? (
                        <img
                            src={chrome.runtime.getURL('static/media/logo.png')}
                            className="App-logo"
                            alt="logo"
                        />
                    ) : (
                        <img src={logo} className="App-logo" alt="logo" />
                    )} */}

                    <h1 className="App-title">B</h1>
                </header>
                <div className="App-stack-view">
                    {breadcrumb.reverse().map(crumb => {
                        return (
                            <img src={crumb.faviconUrl} title={crumb.title} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
