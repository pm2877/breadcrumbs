/*global chrome*/

import React from 'react';
import PropTypes from 'prop-types';
import './stackItem.css';

export default class StackItem extends React.Component {
    static propTypes = {
        index: PropTypes.number,
        details: PropTypes.object
    };

    handleOnClick(url, stackIndex) {
        chrome.runtime.sendMessage(
            {
                message: 'redirect_tab',
                url: url,
                stackIndex
            },
            function(response) {
                console.log(response);
                this.setState({});
            }.bind(this)
        );
    }

    render() {
        const {details, index: stackIndex} = this.props;
        const {faviconUrl, title, url} = details;
        return (
            <img
                className="stackItem-favicon"
                src={faviconUrl}
                title={title}
                onClick={() => this.handleOnClick(url, stackIndex)}
            />
        );
    }
}
