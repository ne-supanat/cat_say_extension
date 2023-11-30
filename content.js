var texts = [];
var cats = [];
var saying = false;

main();

function main() {
  createElement();

  loadResource();
  handleEvents();
}

function createElement() {
  const div = document.createElement("div");
  div.id = "render_div";
  div.innerHTML = `<img id="cat_image" class="img-fluid" style="height: 150px;" src="" alt="cat"></img>`;
  div.style.cssText =
    "display: none; position: fixed; bottom: 0px; right: 10px; width: 150px; height: 150px; z-index: 9998; border: none;";

  const div2 = document.createElement("div");
  div2.id = "bubble_text_div";
  div2.innerHTML = `<div id="bubble_text" style="border-radius: 16px 16px 0px 16px; background-color: #f1f1f1; color: black; padding: 8px; margin: 8px;">Meow</div>`;
  div2.style.cssText =
    "display: none; position: fixed; bottom: 120px; right: 35px;";

  document.body.appendChild(div);
  document.body.appendChild(div2);
}

function loadResource() {
  fetch(chrome.runtime.getURL("static/data.json"))
    .then((response) => response.json())
    .then((data) => {
      texts = data.texts;
      cats = data.cats;

      chrome.storage.sync.get(["cat_index", "show_render"], function (result) {
        const cat_index = result.cat_index ?? 0;
        renderCat(cat_index);

        if (result.show_render) {
          document.getElementById("render_div").style.display = "block";
        } else {
          document.getElementById("render_div").style.display = "none";
        }
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
    const show_render = request.show_render;
    if (show_render != undefined) {
      if (show_render) {
        document.getElementById("render_div").style.display = "block";
      } else {
        document.getElementById("render_div").style.display = "none";
      }
    }

    const cat_index = request.cat_index;
    if (cat_index != undefined) {
      renderCat(cat_index);
    }
  });

  document.getElementById("cat_image").addEventListener("click", onClickSay);
}

function renderCat(cat_index) {
  document.getElementById("cat_image").src = chrome.runtime.getURL(
    cats[cat_index].image
  );
}

function onClickSay() {
  if (!saying) {
    document.getElementById("bubble_text").innerHTML = `"${generateText()}"`;

    saying = true;
    document.getElementById("bubble_text_div").style.display = "block";
    delay(3000).then(() => {
      document.getElementById("bubble_text_div").style.display = "none";
      saying = false;
    });
  }
}

function generateText() {
  return texts[Math.floor(Math.random() * texts.length)];
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
