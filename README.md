# Receipts

A tiny installable web app for showing a receipt on an iPhone without the Photos app's
tap-to-toggle toolbar or info panel. Gallery of thumbnails, tap for a full-screen viewer
with a pinned header, back arrow is the only way out, share sends the image.

Receipts are added from Photos on the phone and stored in the browser's IndexedDB on the
device. Nothing is uploaded anywhere; this repo is only the app shell.

Install: open the page in Safari, Share > Add to Home Screen, then open it from the Home
Screen icon. The service worker caches the shell so it opens with no signal.
