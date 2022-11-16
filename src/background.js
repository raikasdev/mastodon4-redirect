browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    browser.runtime.openOptionsPage();
  }
});
