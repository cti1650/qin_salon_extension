window.onPlayerReady = (event) => {
  var speeds = player.getAvailablePlaybackRates();

  event.target.setPlaybackRate(2.0);
  event.target.playVideo();
}
(async () => {
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
            div.classList.add("extension-content");
            if (!nextPage?.url) {
              div.innerHTML = `<div class="extension-content__item">次の動画はありません。</div>`;
            } else {
              div.innerHTML = `<div class="extension-content__item"><a href="${nextPage.url}">${nextPage.title} >> </a></div>`;
            }
            content[1].appendChild(div);
          }
        }
      });
    }
  }, 800);
})();