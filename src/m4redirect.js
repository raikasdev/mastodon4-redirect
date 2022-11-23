// Firefox<->Chrome compatibility hack
var browser;
var chrome;

// If someone knows a better way to detect Mastodon4 instances, please send me a message!
// raikas@techspace.social
const MASTODON_DIV = document.getElementById("mastodon");
const EXTERNAL_USER_REGEX = /^(@[a-zA-Z0-9_]+)(?!.*@)(?!\/.+)$/; // @username matches, @username@test.social @username/following doesn't
const EXTERNAL_POST_REGEX = /(@[a-zA-Z0-9_]+)(?!.*@)\/(\d+)/; // @username matches, @username@test.social doesn't

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
      if (
        item.enabled != null &&
        item.enabled != "true" &&
        item.enabled !== true
      ) {
        return; // Disabled
      }
      // Lets first parse some generic URLs out of the way
      // For example: /explore -> /home
      // Using switch case if there comes more pages that this should be done to
      if (
        item.redirectExplore == null &&
        item.redirectExplore == "true" &&
        item.redirectExplore === true
      ) {
        switch (window.location.pathname) {
          case "/explore":
            url.pathname = "/home";
            window.location.replace(url.toString());
            break;
        }
      }

      // Then use Regex to find if a page is a user or a post
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

  const getting = (browser || chrome).storage.sync.get([
    "url",
    "enabled",
    "redirectExplore",
  ]);
  getting.then(onGot, onError);
}
