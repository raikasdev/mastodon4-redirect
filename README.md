# mastodon4-redirect

An Browser Extension to redirect users to their home instance.
Instead of only redirecting only on actions (follow, like, etc), user is automatically redirected to the equilevant page on their home instance.

## Help, I am getting redirected multiple times!

You might not be logged into your home instance, or you haven't configured the addon.

### Why not a background script and webRequest?

Mastodon 4 uses clientside routing. Also Chrome is discontinuing the webrequest API.
