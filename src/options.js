// Firefox<->Chrome compatibility hack
var browser;
var chrome;

function saveOptions(e) {
  e.preventDefault();
  (browser || chrome).storage.sync.set({
    url: document.querySelector("#url").value,
  });
  document.getElementById("saved").style.display = "block";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#url").value =
      result.url || "https://mastodon.social";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = (browser || chrome).storage.sync.get("url");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
