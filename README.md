# mastodon4-redirect

An Firefox Extension to redirect users to their home instance.
Instead of only redirecting only on actions (follow, like, etc), user is automatically redirected to the equilevant page on their home instance.

## Installing

1. Install the addon
2. Go to `about:addons`
3. Select the addon
4. Go to configuration section
5. Set the URL to your instance url (Default: https://mastodon.social)

## Help, I am getting redirected multiple times!

You might not be logged into your home instance, or you haven't configured the addon.

## How does it work?

It uses a content script.

### Why not a background script and webRequest?

Mastodon 4 uses clientside routing.
