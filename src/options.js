// Firefox<->Chrome compatibility hack
var browser;
var chrome;

function saveOptions(e) {
  e.preventDefault();
  (browser || chrome).storage.sync.set({
    url: document.querySelector("#url").value,
    redirectExplore: document.querySelector("#redirect_explore").checked,
  });
  document.getElementById("saved").style.display = "block";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#url").value =
      result.url || "https://mastodon.social";
    document.querySelector("#redirect_explore").checked =
      result.redirectExplore || result.redirectExplore == null ? true : false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = (browser || chrome).storage.sync.get([
    "url",
    "redirectExplore",
  ]);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
