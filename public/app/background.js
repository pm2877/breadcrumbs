// const axios = require('axios');

const breadcrumbs = {};

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            message: 'clicked_browser_action'
        });
    });
});

// Receives the tab information from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'add_location') {
        const {tab = {}} = sender;
        const {id, title, favIconUrl, url} = tab;
        if (!breadcrumbs[id]) breadcrumbs[id] = [];

        faviconUrl = favIconUrl;
        //  || (await getFaviconFromUrl(url));
        breadcrumbs[id].push({
            title,
            faviconUrl,
            url
        });
        sendResponse({
            breadcrumb: breadcrumbs[id]
        });
    }
});

// chrome.webNavigation.onCommitted.addListener(function(details) {
//     // e.preventDefault();
//     // e.stopPropagation();
//     const {tabId, transitionType} = details;
//     console.log('++++++++++ transitionType: ', transitionType);
//     chrome.runtime.sendMessage(
//         {message: 'incoming', breadcrumb: breadcrumbs[tabId]},
//         function(response) {
//             console.log(response);
//             //   breadcrumb = response.breadcrumb;
//         }
//     );
// });

// async function getFaviconFromUrl(url) {
//     // Make a request for a favicon if it does not exist
//     try {
//         const response = await axios.get(
//             `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
//         );
//         return response;
//     } catch (error) {
//         console.log('Favicon fetch error: ', error);
//     }
// }
