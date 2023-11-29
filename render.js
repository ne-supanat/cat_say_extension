var texts = [];
var cats = [];

main();

function main() {
  loadResource();
  handleEvents();
}

function loadResource() {
  fetch(chrome.runtime.getURL("static/data.json"))
    .then((response) => response.json())
    .then((data) => {
      texts = data.texts;
      cats = data.cats;

      chrome.storage.sync.get(["cat_index", "show_render"], function (result) {
        cat_index = result.cat_index ?? 0;
        const cat = cats[cat_index];
        document.getElementById("image").src = cat.image;
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

function handleEvents() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const cat_index = request.cat_index;
    if (cat_index != undefined) {
      const cat = cats[cat_index];
      document.getElementById("image").src = cat.image;
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("image").addEventListener("click", onClickSay);
  });
}

function onClickSay() {
  chrome.runtime.sendMessage({
    show_text: show_text,
    text_date: generateText(),
  });
  document.getElementById("text").innerHTML = `"${generateText()}"`;

  document.getElementById("text").style.visibility = "visible";
  delay(3000).then(() => {
    document.getElementById("text").style.visibility = "hidden";
  });
}

function generateText() {
  return texts[Math.floor(Math.random() * texts.length)];
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
