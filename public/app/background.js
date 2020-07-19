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
    } else if (request.message === 'redirect_tab') {
        const {tab = {}} = sender;
        const {id: tabId} = tab;
        const {url, stackIndex} = request;

        const stackSize = breadcrumbs[tabId].length;
        console.log('before: ', breadcrumbs[tabId]);
        breadcrumbs[tabId].splice(stackIndex, stackSize - stackIndex);
        console.log('after: ', breadcrumbs[tabId]);
        chrome.tabs.update(tabId, {url}, function(tab) {
            console.log('tab updated: ', tab);
        });
        sendResponse('tab updated');
    }
});

// Keeps track of the links clicked
chrome.webNavigation.onCommitted.addListener(function(details) {
    const {tabId, transitionType} = details;
    console.log('++++++++++ transitionType: ', transitionType);
    if (transitionType !== 'auto_subframe')
        chrome.tabs.get(tabId, function(tab) {
            if (!breadcrumbs[tabId]) breadcrumbs[tabId] = [];
            const {title, favIconUrl, url} = tab;
            faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
            breadcrumbs[tabId].push({
                tabId,
                title,
                faviconUrl,
                url
            });
        });
});
