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

// Returns the breadcrumb of a particular tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'get_breadcrumb') {
        const {tab = {}} = sender;
        const {id} = tab;
        if (!breadcrumbs[id]) breadcrumbs[id] = [];
        sendResponse({
            breadcrumb: breadcrumbs[id]
        });
    }
});

chrome.webNavigation.onCommitted.addListener(function(details) {
    const {tabId, transitionType} = details;
    console.log('++++++++++ transitionType: ', transitionType);
    if (transitionType !== 'auto_subframe')
        chrome.tabs.get(tabId, function(tab) {
            if (!breadcrumbs[tabId]) breadcrumbs[tabId] = [];
            const {title, favIconUrl, url} = tab;
            faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=32`;
            breadcrumbs[tabId].push({
                title,
                faviconUrl,
                url
            });
        });
});
