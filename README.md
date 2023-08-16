# mastodon4-redirect

> [!WARNING]  
> Mastodon4 Redirect has reached end-of-support due to developer moving to developing [Tusked](https://github.com/raikasdev/tusked). I recommend moving to [FediAct](https://github.com/lartsch/FediAct) or [Mastodon Simple Federation](https://github.com/rugk/mastodon-simplified-federation).

[![Image](https://extensionworkshop.com/assets/img/documentation/publish/get-the-addon-178x60px.dad84b42.png)](https://addons.mozilla.org/en-US/firefox/addon/mastodon4-redirect)
[![Image](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/mastodon4-redirect/acbfckpoogjdigldffcbldijhgnjpfnc)

An Browser Extension to redirect users to their home instance.
Instead of only redirecting only on actions (follow, like, etc), user is automatically redirected to the equilevant page on their home instance.

## Help, I am getting redirected multiple times!

You might not be logged into your home instance, or you haven't configured the addon.

### Why not a background script and webRequest?

Mastodon 4 uses clientside routing. Also Chrome is discontinuing the webrequest API.

## Project structure

/ Root Contains the Firefox manifest and icon
/src Contains the code
/chrome Contains the Chrome port (manifest v3 and icons)
/chrome/src Symbolic link to /src
/chrome/m4redirect.js Hard link to /src/m4redirect.js (so the src symbolic link works for chrome)
