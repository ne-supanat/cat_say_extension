main();

function main() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request);

    chrome.tabs.query({}, function (tabs) {
      for (index in tabs) {
        chrome.tabs.sendMessage(tabs[index].id, {
          show_render: request.show_render,
          cat_index: request.cat_index,
        });
      }
    });
  });
}
