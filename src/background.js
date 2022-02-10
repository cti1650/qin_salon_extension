const doScript = (url, tabId) => {
  if (
    ~url.indexOf('www.wantedly.com') ||
    ~url.indexOf('www.vorkers.com') ||
    ~url.indexOf('en-hyouban.com')
  ) {
    chrome.scripting.insertCSS(
      {
        target: { tabId: tabId },
        files: ['content.css'],
      },
      () => {}
    );
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['jquery-3.6.0.min.js', 'script.js'],
      },
      () => {}
    );
  }
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    doScript(tab.url, tabId);
  }
});

chrome.action.onClicked.addListener((tab) => {
  doScript(tab.url, tab.id);
});
