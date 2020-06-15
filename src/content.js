/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, {FrameContextConsumer} from 'react-frame-component';
import App from './App';
import './content.css';

class Main extends React.Component {
    render() {
        return (
            <Frame
                head={[
                    <link
                        type="text/css"
                        rel="stylesheet"
                        href={chrome.runtime.getURL('/static/css/content.css')}
                    ></link>
                ]}
            >
                <FrameContextConsumer>
                    {// Callback is invoked with iframe's window and document instances
                    ({document, window}) => {
                        // Render Children

                        //  return (
                        //     <div className={'my-extension'}>
                        //          <h1>Hello world - My first Extension</h1>
                        //     </div>
                        //  )
                        return (
                            <App
                                document={document}
                                window={window}
                                isExt={true}
                                breadcrumb={this.props.breadcrumb}
                            />
                        );
                    }}
                </FrameContextConsumer>
            </Frame>
        );
    }
}

const app = document.createElement('div');
app.id = 'my-extension-root';

document.body.appendChild(app);
let breadcrumb = [];

chrome.runtime.sendMessage({message: 'add_location'}, function(response) {
    breadcrumb = response.breadcrumb;
    console.log('current breadcrumb: ', breadcrumb);
    ReactDOM.render(<Main breadcrumb={breadcrumb} />, app);

    app.style.display = 'block';
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'clicked_browser_action') {
        toggle();
    }
});

function toggle() {
    if (app.style.display === 'none') {
        app.style.display = 'block';
    } else {
        app.style.display = 'none';
    }
}
