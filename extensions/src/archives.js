(async () => {
  setTimeout(() => {
    chrome.storage.local.get(["scrollY"], ({ scrollY }) => {
      if (scrollY === undefined) {
        scrollY = 0;
        chrome.storage.local.set({ scrollY });
      }
      window.scrollTo(0, scrollY);
      window.addEventListener("scroll", function () {
        chrome.storage.local.set({ scrollY: window.scrollY });
      });
    });
  }, 400);
  setTimeout(() => {
    var dom = document.querySelectorAll(".MuiCard-root");
    if (dom.length > 1) {
      let arr = [];
      dom.forEach((item) => {
        arr = [
          ...arr,
          {
            category:
              item.parentElement.parentElement.parentElement.getElementsByTagName(
                "h2"
              )[0].textContent,
            title: item.innerText,
            url: item.getElementsByTagName("a")[0].href,
          },
        ];
      });
      // console.log(arr);
      chrome.runtime.sendMessage(
        {
          message: arr,
        },
        function () {
          chrome.storage.local.get(["test_key"], ({ test_key }) => {
            // Pass any observed errors down the promise chain.
            if (chrome.runtime.lastError) {
              return;
            }
            // console.log(test_key);
          });
        }
      );
    }
  }, 2000);
})();
