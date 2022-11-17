// Firefox<->Chrome compatibility hack
var browser;
var chrome;

function saveOptions(e) {
  e.preventDefault();

  (browser || chrome).storage.sync.set({
    enabled: document.querySelector("#enabled").checked,
  });
  document.getElementById("saved").style.display = "block";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#enabled").checked =
      result.enabled == null ||
      result.enabled == "true" ||
      result.enabled === true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = (browser || chrome).storage.sync.get("enabled");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

document.querySelector("#enabled").addEventListener("change", (event) => {
  saveOptions(event);
});

document.querySelector("#settings").addEventListener("click", () => {
  (browser || chrome).runtime.openOptionsPage();
});
