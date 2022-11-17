# mastodon4-redirect

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
