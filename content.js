var texts = [];

main();

function main() {
  const iframe = createIframe();

  loadResource(iframe);
  handleEvents(iframe);
}

function createIframe() {
  const iframe = document.createElement("iframe");

  iframe.src = chrome.runtime.getURL("render.html");
  iframe.setAttribute("allowtransparency", "true");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("frameborder", "0");

  iframe.style.cssText =
    "color-scheme: light; display: none; background-color: transparent; position: fixed; bottom: 0; right: 0; width: 300px; height: 300px; z-index: 9999; border: none;";

  document.body.appendChild(iframe);

  return iframe;
}

function loadResource(iframe) {
  fetch(chrome.runtime.getURL("static/data.json"))
    .then((response) => response.json())
    .then((data) => {
      texts = data.texts;

      chrome.storage.sync.get(["show_render"], function (result) {
        if (result.show_render) {
          iframe.style.display = "block";
        } else {
          iframe.style.display = "none";
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

function handleEvents(iframe) {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const show_render = request.show_render;

    if (iframe && show_render != undefined) {
      if (show_render) {
        iframe.style.display = "block";
      } else {
        iframe.style.display = "none";
      }
    }
  });
}
