// Firefox<->Chrome compatibility hack
var browser;
var chrome;

(browser || chrome).runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    (browser || chrome).runtime.openOptionsPage();
  }
});
