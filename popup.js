var cats = [];

var cat_index = 0;

main();

function main() {
  loadResource();
  handleEvents();
  getFromStorage();
}

function loadResource() {
  fetch(chrome.runtime.getURL("static/data.json"))
    .then((response) => response.json())
    .then((data) => {
      cats = data.cats;

      renderCat();
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

function handleEvents() {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("prev_cat")
      .addEventListener("click", onClickPrevCat);
    document
      .getElementById("next_cat")
      .addEventListener("click", onClickNextCat);

    document
      .getElementById("render")
      .addEventListener("click", onClickRenderAdd);
    document
      .getElementById("remove")
      .addEventListener("click", onClickRenderRemove);
  });
}

function onClickNextCat() {
  cat_index++;
  if (cat_index >= cats.length) {
    cat_index = 0;
  }

  renderCat();
}

function onClickPrevCat() {
  cat_index--;
  if (cat_index < 0) {
    cat_index = cats.length - 1;
  }

  renderCat();
}

function renderCat() {
  chrome.storage.sync.set({ cat_index: cat_index });
  chrome.runtime.sendMessage({ cat_index: cat_index });

  const cat = cats[cat_index];
  document.getElementById("cat_specie").innerHTML = `${cat.name}`;
  document.getElementById("image").src = cat.image;
}

function onClickRenderAdd() {
  chrome.storage.sync.set({ show_render: true });
  chrome.runtime.sendMessage({ show_render: true });

  document.getElementById("render").style.display = "none";
  document.getElementById("remove").style.display = "block";
}

function onClickRenderRemove() {
  chrome.storage.sync.set({ show_render: false });
  chrome.runtime.sendMessage({ show_render: false });

  document.getElementById("render").style.display = "block";
  document.getElementById("remove").style.display = "none";
}

function getFromStorage() {
  chrome.storage.sync.get(["cat_index", "show_render"], function (result) {
    cat_index = result.cat_index ?? 0;

    if (result.show_render ?? false) {
      document.getElementById("render").style.display = "none";
      document.getElementById("remove").style.display = "block";
    } else {
      document.getElementById("render").style.display = "block";
      document.getElementById("remove").style.display = "none";
    }
  });
}
