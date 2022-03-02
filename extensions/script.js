(async () => {
  setTimeout(() => {
    if (window.location.href === "https://qin.salon/archives") {
      chrome.storage.local.get(["scrollY"], ({ scrollY }) => {
        if (scrollY === undefined) {
          scrollY = 0;
          chrome.storage.local.set({ scrollY });
        }
        window.scrollTo(0, scrollY);
        window.addEventListener('scroll', function(){
          if (window.location.href === "https://qin.salon/archives") {
            chrome.storage.local.set({ scrollY: window.scrollY });
          }
        });
      });
    }
  }, 400);
  setTimeout(() => {
    var dom = document.querySelectorAll(".MuiCard-root");
    if (dom.length == 1) {
      chrome.storage.local.get(["test_key"], ({ test_key }) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return;
        }
        // console.log(test_key);
        if (test_key) {
          var content = document.querySelectorAll(".MuiCardContent-root");
          if (content) {
            const nextPage = test_key.filter(
              (item, index) => test_key[index - 1]?.url == location.href
            )[0];
            const div = document.createElement("div");
            div.classList.add("Extension-content");
            if (!nextPage?.url) {
              div.innerHTML = `<div class="Extension-content__item">次の動画はありません。</div>`;
            } else {
              div.innerHTML = `<div class="Extension-content__item"><a href="${nextPage.url}">${nextPage.title} >> </a></div>`;
            }
            content[1].appendChild(div);
          }
        }
      });
    }
  }, 600);
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
