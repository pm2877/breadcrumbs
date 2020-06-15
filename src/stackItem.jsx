import React from 'react';
import PropTypes from 'prop-types';

export default class StackItem extends React.Component {
    static propTypes = {
        index: PropTypes.number,
        details: PropTypes.object
    };

    render() {
        const {details} = this.props;
        const {faviconUrl, title} = details;
        return <img src={faviconUrl} title={title} />;
    }
}
