// If someone knows a better way to detect Mastodon4 instances, please send me a message!
// raikas@techspace.social
const MASTODON_DIV = document.getElementById("mastodon");
const EXTERNAL_USER_REGEX = /(@[a-zA-Z0-9_]+)(?!.*@)/; // @username matches, @username@test.social doesn't
const EXTERNAL_POST_REGEX = /(@[a-zA-Z0-9_]+)(?!.*@)\/(\d+)/; // @username matches, @username@test.social doesn't
console.log("hello");
if (MASTODON_DIV) {
  // Then the magic
  function onError(error) {
    console.error(`Error: ${error}`);
  }

  function onGot(item) {
    let homeInstance = "https://mastodon.social";
    if (item.url) {
      homeInstance = item.url;
    }
    const url = new URL(homeInstance);
    async function redirectToHome() {
      if (url.hostname === window.location.hostname) return; // We are on the home instance :)
      // Lets first parse some generic URLs out of the way
      // For example: /explore and /home
      switch (window.location.pathname) {
        case "/explore":
        case "/home":
          url.pathname = "/home";
          window.location.replace(url.toString());
          break;
      }
      if (window.location.pathname.match(EXTERNAL_POST_REGEX)) {
        url.pathname = `/authorize_interaction`;
        url.searchParams.set("uri", window.location.href);
        window.location.replace(url.toString());
      } else if (window.location.pathname.match(EXTERNAL_USER_REGEX)) {
        const username = `${
          window.location.pathname.match(EXTERNAL_USER_REGEX)[1]
        }@${window.location.hostname}`;

        url.pathname = `/${username}`;
        window.location.replace(url.toString());
      }
    }
    redirectToHome();

    // This is a bit of hacky way to detect client side routing changes, but seems to work!
    let currentUrl = window.location.href;
    document.body.addEventListener(
      "click",
      () => {
        requestAnimationFrame(() => {
          if (currentUrl !== window.location.href) {
            redirectToHome();
            currentUrl = window.location.href;
          }
        });
      },
      true
    );
  }

  const getting = chrome.storage.sync.get("url");
  getting.then(onGot, onError);
}