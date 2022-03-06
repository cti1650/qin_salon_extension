const doScript = (url, tabId) => {
  if (~url.indexOf("qin.salon/archives")) {
    chrome.scripting.insertCSS(
      {
        target: { tabId: tabId },
        files: ["content.css"],
      },
      () => {}
    );
    if (url === "https://qin.salon/archives") {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["jquery-3.6.0.min.js", "src/archives.js"],
        },
        () => {}
      );
    } else {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["jquery-3.6.0.min.js", "src/archive.js"],
        },
        () => {}
      );
    }
  }
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    doScript(tab.url, tabId);
  }
});

chrome.action.onClicked.addListener((tab) => {
  doScript(tab.url, tab.id);
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.get(["test_key"], ({ test_key }) => {
    if (!test_key) {
      test_key = [];
      chrome.storage.local.set({ test_key });
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request.message);
  if (request.message) {
    chrome.storage.local.set({ test_key: request.message }, function () {});
    sendResponse(
      new Promise((resolve, reject) => {
        // Asynchronously fetch all data from storage.local.
        chrome.storage.local.get(["test_key"], ({ test_key }) => {
          // Pass any observed errors down the promise chain.
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          // Pass the data retrieved from storage down the promise chain.
          resolve(test_key);
        });
      })
    );
  }
  return true;
});
